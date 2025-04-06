// frontend/src/components/NotificationBell.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotificationBell.css';

function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  // Sample data - replace with your API call later
  useEffect(() => {
    // Simulating notifications data
    const sampleNotifications = [
      {
        id: 1,
        message: "Potential hive threat detected in Hive #3",
        time: "10 minutes ago",
        read: false,
        severity: "high"
      },
      {
        id: 2,
        message: "Temperature fluctuation in Hive #5",
        time: "2 hours ago",
        read: false,
        severity: "medium"
      },
      {
        id: 3,
        message: "Routine inspection reminder for Hive #2",
        time: "1 day ago",
        read: true,
        severity: "low"
      }
    ];

    setNotifications(sampleNotifications);
    // Check if there are any unread notifications
    setHasUnread(sampleNotifications.some(notif => !notif.read));
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClick = (id) => {
    // Mark as read functionality would go here
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    setHasUnread(updatedNotifications.some(notif => !notif.read));
    
    // Navigate to the notification detail page
    navigate(`/notifications/${id}`);
    
    // Close the dropdown
    setShowNotifications(false);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
    setNotifications(updatedNotifications);
    setHasUnread(false);
  };

  const viewAllNotifications = () => {
    navigate('/notifications');
    setShowNotifications(false);
  };

  return (
    <div className="notification-container" ref={notificationRef}>
      <div className="bell-icon" onClick={toggleNotifications}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        {hasUnread && <span className="notification-badge"></span>}
      </div>

      {showNotifications && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h3>Notifications</h3>
            {hasUnread && (
              <button className="mark-all-read" onClick={markAllAsRead}>
                Mark all as read
              </button>
            )}
          </div>
          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${!notification.read ? 'unread' : ''} ${notification.severity}`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="notification-content">
                    <p>{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-notifications">No notifications</p>
            )}
          </div>
          <div className="notifications-footer">
            <button className="view-all" onClick={viewAllNotifications}>
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;