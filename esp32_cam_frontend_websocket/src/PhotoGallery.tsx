// src/PhotoGallery.tsx
import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import './PhotoGallery.css';

interface Photo {
  id: number;
  image_url: string;
  uploaded_at: string;
  processed_image_url: string | null;
  label: string[];
}

interface PhotoGalleryProps {
  token: string;
  refreshTrigger: number;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ token, refreshTrigger }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [availableLabels, setAvailableLabels] = useState<string[]>([]);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<number[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [filterLabel, setFilterLabel] = useState<string>('');
  const [showUnlabeled, setShowUnlabeled] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize] = useState<number>(20);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const fetchPhotos = async (page: number = 1, labelFilter?: string, showUnlabeledFilter?: boolean) => {
    try {
      const params: any = {
        page: page,
        page_size: pageSize
      };
      if (labelFilter) {
        params.label = labelFilter;
      }
      if (showUnlabeledFilter) {
        params.show_unlabeled = 'true';
      }
      const response = await axios.get('http://172.20.10.5:20000/api/user-photos/', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params
      });
      setPhotos(response.data.photos);
      setAvailableLabels(response.data.available_labels);
      setPageCount(response.data.total_pages > 0 ? response.data.total_pages : 1);
      setCurrentPage(response.data.current_page - 1); // react-paginate starts at 0
      setSelectedPhotoIds([]);
      setSelectAll(false);
    } catch (error) {
      console.error('獲取照片失敗:', error);
      setPhotos([]);
      setPageCount(1);
      setCurrentPage(0);
      setSelectedPhotoIds([]);
      setSelectAll(false);
    }
  };

  useEffect(() => {
    fetchPhotos(1, filterLabel, showUnlabeled);
  }, [filterLabel, showUnlabeled, refreshTrigger]);

  const handleSelectPhoto = (photoId: number, checked: boolean) => {
    if (checked) {
      setSelectedPhotoIds((prev) => [...prev, photoId]);
    } else {
      setSelectedPhotoIds((prev) => prev.filter((id) => id !== photoId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      const allPhotoIds = photos.map(photo => photo.id);
      setSelectedPhotoIds(allPhotoIds);
    } else {
      setSelectedPhotoIds([]);
    }
  };

  const handlePageClick = (selected: { selected: number }) => {
    fetchPhotos(selected.selected + 1, filterLabel, showUnlabeled);
  };

  const handleBatchLabel = async () => {
    if (selectedPhotoIds.length === 0 || !selectedLabel) return;
    try {
      await axios.post('http://172.20.10.5:20000/api/batch_label_photos/', {
        photo_ids: selectedPhotoIds,
        label: selectedLabel
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSelectedPhotoIds([]);
      setSelectAll(false);
      fetchPhotos(currentPage + 1, filterLabel, showUnlabeled);
    } catch (error) {
      console.error('批次標籤失敗:', error);
    }
  };

  const handleBatchDelete = async () => {
    if (selectedPhotoIds.length === 0) return;
    try {
      await axios.post('http://172.20.10.5:20000/api/batch_delete_photos/', {
        photo_ids: selectedPhotoIds
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSelectedPhotoIds([]);
      setSelectAll(false);
      fetchPhotos(currentPage + 1, filterLabel, showUnlabeled);
    } catch (error) {
      console.error('批次刪除失敗:', error);
    }
  };

  const handleShowUnlabeledChange = (checked: boolean) => {
    setShowUnlabeled(checked);
    if (checked) {
      setFilterLabel('');
    }
  };

  return (
    <div className="photo-gallery">
      <h2>我的照片</h2>

      {/* 標籤篩選 */}
      <div className="filter-section">
        <label>
          <input
            type="checkbox"
            checked={showUnlabeled}
            onChange={(e) => handleShowUnlabeledChange(e.target.checked)}
          />
          顯示未標記照片
        </label>
        {!showUnlabeled && (
          <>
            <label>標籤篩選：</label>
            <select value={filterLabel} onChange={(e) => setFilterLabel(e.target.value)}>
              <option value=''>全部</option>
              {availableLabels.map(label => (
                <option key={label} value={label}>{label}</option>
              ))}
            </select>
          </>
        )}
      </div>

      {/* 批次操作 */}
      <div className="batch-actions">
        <label>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
          全選
        </label>
        <label>批次標籤：</label>
        <select value={selectedLabel} onChange={(e) => setSelectedLabel(e.target.value)}>
          <option value=''>選擇標籤</option>
          {availableLabels.map(label => (
            <option key={label} value={label}>{label}</option>
          ))}
        </select>
        <button onClick={handleBatchLabel} disabled={!selectedLabel || selectedPhotoIds.length === 0}>
          批次標籤
        </button>
        <button onClick={handleBatchDelete} disabled={selectedPhotoIds.length === 0}>
          批次刪除
        </button>
      </div>

      {/* 瀑布流顯示照片 */}
      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map(photo => (
          <div key={photo.id} className="photo-item">
            <input 
              type="checkbox" 
              onChange={(e) => handleSelectPhoto(photo.id, e.target.checked)}
              checked={selectedPhotoIds.includes(photo.id)}
              className="photo-checkbox"
            />
            <img src={photo.image_url} alt={`Photo ${photo.id}`} className="photo-image" />
            <div className="photo-info">
              <span>上傳時間: {new Date(photo.uploaded_at).toLocaleString()}</span>
              <span>標籤: {photo.label.join(', ') || '無'}</span>
            </div>
          </div>
        ))}
      </Masonry>

      {/* 分頁 */}
      {pageCount > 1 && (
        <ReactPaginate
          onPageChange={handlePageClick}
          pageCount={pageCount}
          forcePage={currentPage >= 0 && currentPage < pageCount ? currentPage : 0}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          previousLabel={'上一頁'}
          nextLabel={'下一頁'}
          breakLabel={'...'}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      )}
    </div>
  );
};

export default PhotoGallery;
