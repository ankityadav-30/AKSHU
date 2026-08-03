// APP/client/src/admin/components/PageHeader.jsx

/**
 * Reusable Admin Page Header
 *
 * @param {string}          title    - Page title
 * @param {string}          subtitle - Optional subtitle text
 * @param {React.ReactNode} actions  - Action buttons (right side)
 */
const PageHeader = ({ title, subtitle, actions }) => (
    <div className="admin-page-header">
        <div className="admin-page-header__info">
            <h1 className="admin-page-header__title">{title}</h1>
            {subtitle && <p className="admin-page-header__subtitle">{subtitle}</p>}
        </div>
        {actions && <div className="admin-page-header__actions">{actions}</div>}
    </div>
);

export default PageHeader;
