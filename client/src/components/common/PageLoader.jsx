// APP/client/src/components/common/PageLoader.jsx

import { motion } from "framer-motion";

const PageLoader = () => {
    return (
        <div className="page-loader">
            <motion.div
                className="page-loader__spinner"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                }}
            />
            <style>{`
                .page-loader {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    background: var(--color-bg-body);
                }
                .page-loader__spinner {
                    width: 48px;
                    height: 48px;
                    border: 3px solid var(--color-bg-muted);
                    border-top-color: var(--color-primary);
                    border-radius: 50%;
                }
            `}</style>
        </div>
    );
};

export default PageLoader;
