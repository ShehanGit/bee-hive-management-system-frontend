// frontend/src/pages/NotificationPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './NotificationPage.css';

function NotificationPage() {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allNotifications, setAllNotifications] = useState([]);

  useEffect(() => {
    // Sample notifications data - replace with API call later
    const sampleNotifications = [
      {
        id: 1,
        message: "Potential hive threat detected in Hive #3",
        time: "10 minutes ago",
        read: false,
        severity: "high",
        details: {
          hiveId: 3,
          timestamp: "2025-04-06T14:30:00",
          location: "North Sector",
          threatType: "Predator Detection",
          description: "Motion sensors detected unusual activity near hive entrance. Camera footage shows potential predator (likely a bear) in vicinity.",
          recommendedActions: [
            "Check physical barriers around the hive",
            "Deploy additional deterrents if necessary",
            "Schedule an immediate inspection"
          ],
        }
      },
      {
        id: 2,
        message: "Temperature fluctuation in Hive #5",
        time: "2 hours ago",
        read: false,
        severity: "medium",
        details: {
          hiveId: 5,
          timestamp: "2025-04-06T12:15:00",
          location: "East Sector",
          threatType: "Environmental Anomaly",
          description: "Temperature sensors recorded a 5°C drop in internal hive temperature over the past hour, which is outside normal parameters for this time of day.",
          recommendedActions: [
            "Check for insulation issues",
            "Verify heating system functionality",
            "Monitor temperature for the next 6 hours"
          ],
          graphData: {
            labels: ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM"],
            temperatures: [32, 33, 32.5, 31, 28, 27]
          }
        }
      },
      {
        id: 3,
        message: "Routine inspection reminder for Hive #2",
        time: "1 day ago",
        read: true,
        severity: "low",
        details: {
          hiveId: 2,
          timestamp: "2025-04-05T09:00:00",
          location: "West Sector",
          type: "Maintenance Reminder",
          description: "Scheduled bi-weekly inspection due for Hive #2. Last inspection was conducted 14 days ago.",
          checklist: [
            "Check queen activity",
            "Assess honey stores",
            "Inspect for pests or disease",
            "Evaluate brood pattern",
            "Check hive structure integrity"
          ],
          previousFindings: "Healthy brood pattern, no signs of disease. Honey production on track."
        }
      }
    ];

    setAllNotifications(sampleNotifications);
    
    if (id) {
      // Find specific notification if ID is provided
      const found = sampleNotifications.find(n => n.id === parseInt(id));
      if (found) {
        setNotification(found);
        // Mark as read logic would go here in real implementation
      }
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="loading">Loading notification details...</div>;
  }

  return (
    <div>
    <div className="notification-page">
    <Navbar />
      <div className="notification-sidebar">
        <h2>Notifications</h2>
        <div className="notification-list">
          {allNotifications.map(notif => (
            <Link 
              to={`/notifications/${notif.id}`} 
              className={`notification-list-item ${notif.severity} ${notif.id === parseInt(id) ? 'active' : ''}`}
              key={notif.id}
            >
              <h3>{notif.message}</h3>
              <span className="notification-time">{notif.time}</span>
              {!notif.read && <span className="unread-indicator"></span>}
            </Link>
          ))}
        </div>
      </div>

      <div className="notification-detail">
        {notification ? (
          <>
            <div className={`notification-header ${notification.severity}`}>
              <h1>{notification.message}</h1>
              <span className="notification-timestamp">{notification.time}</span>
              <div className={`severity-badge ${notification.severity}`}>
                {notification.severity.charAt(0).toUpperCase() + notification.severity.slice(1)} Priority
              </div>
            </div>

            <div className="notification-content">
              {notification.details && (
                <>
                  <div className="detail-section">
                    <h3>Details</h3>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <label>Hive:</label>
                        <span>#{notification.details.hiveId}</span>
                      </div>
                      <div className="detail-item">
                        <label>Time:</label>
                        <span>{new Date(notification.details.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="detail-item">
                        <label>Location:</label>
                        <span>{notification.details.location}</span>
                      </div>
                      <div className="detail-item">
                        <label>Type:</label>
                        <span>{notification.details.threatType || notification.details.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Description</h3>
                    <p>{notification.details.description}</p>
                  </div>

                  {notification.details.recommendedActions && (
                    <div className="detail-section">
                      <h3>Recommended Actions</h3>
                      <ul className="action-list">
                        {notification.details.recommendedActions.map((action, index) => (
                          <li key={index}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {notification.details.checklist && (
                    <div className="detail-section">
                      <h3>Inspection Checklist</h3>
                      <ul className="checklist">
                        {notification.details.checklist.map((item, index) => (
                          <li key={index}>
                            <input type="checkbox" id={`check-${index}`} />
                            <label htmlFor={`check-${index}`}>{item}</label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {notification.details.previousFindings && (
                    <div className="detail-section">
                      <h3>Previous Findings</h3>
                      <p>{notification.details.previousFindings}</p>
                    </div>
                  )}

                  {notification.details.graphData && (
                    <div className="detail-section">
                      <h3>Temperature Data</h3>
                      <div className="graph-placeholder">
                        {/* In a real app, you'd render an actual chart here */}
                        <div className="mock-graph">
                          <div className="graph-title">Temperature over time</div>
                          <div className="graph-bars">
                            {notification.details.graphData.temperatures.map((temp, i) => (
                              <div 
                                key={i} 
                                className="graph-bar" 
                                style={{ height: `${(temp - 25) * 10}px` }}
                                title={`${notification.details.graphData.labels[i]}: ${temp}°C`}
                              ></div>
                            ))}
                          </div>
                          <div className="graph-labels">
                            {notification.details.graphData.labels.map((label, i) => (
                              <span key={i}>{label}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {notification.details.images && (
                    <div className="detail-section">
                      <h3>Images</h3>
                      <div className="image-grid">
                        {notification.details.images.map((img, index) => (
                          <div key={index} className="image-placeholder">
                            Image {index + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="action-buttons">
                    <button className="primary-button">Mark as Resolved</button>
                    <button className="secondary-button">Assign to Team Member</button>
                    <button className="outline-button">Generate Report</button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="no-notification-selected">
            <h2>No notification selected</h2>
            <p>Select a notification from the list to view details</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default NotificationPage;