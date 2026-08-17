import "../styles/Loading.css";

function Loading() {

    return (

        <div className="loading-container">
             <div className="loading-card">
            <div className="loader"></div>

            <h1 className="loading-title">
                Preparing your personalized quiz...
            </h1>

            <p className="loading-text">
                AI is creating questions based on your selected topic.
            </p>

            <p className="loading-tip">
                This usually takes 3–5 seconds.
            </p>
            </div>
        </div>

    );

}

export default Loading;