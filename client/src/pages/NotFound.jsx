// APP/client/src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ROUTES } from "../utils/constants.js";
import "./PageShared.css";

const NotFound = () => (
    <div className="not-found">
        <motion.div className="not-found__code" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            404
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Page Not Found
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Link to={ROUTES.HOME} className="btn btn--primary">
                Go Home
            </Link>
        </motion.div>
    </div>
);

export default NotFound;
