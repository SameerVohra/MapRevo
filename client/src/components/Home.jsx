function Home() {
    const handleReview = (e) => {
        console.log('Overlay clicked');
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <iframe
                width="100%"
                height="100%"
                src={`${import.meta.env.VITE_MAP_URL}`}
                frameBorder="0"
                className="absolute inset-0"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default Home;
