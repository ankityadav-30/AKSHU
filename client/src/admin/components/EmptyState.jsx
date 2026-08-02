// APP/client/src/admin/components/EmptyState.jsx

/**
 * Empty State Component
 *
 * @param {React.ReactNode} icon     - Icon element
 * @param {string}          title    - Title text
 * @param {string}          message  - Subtitle/description
 * @param {React.ReactNode} action   - Action button or link
 */
const EmptyState = ({ icon, title = "No data found", message, action }) => (
    <div className="admin-empty-state">
        {icon && <div className="admin-empty-state__icon">{icon}</div>}
        <h3 className="admin-empty-state__title">{title}</h3>
        {message && <p className="admin-empty-state__message">{message}</p>}
        {action && <div>{action}</div>}
    </div>
);

export default EmptyState;
