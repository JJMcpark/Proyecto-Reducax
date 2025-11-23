const Home = () => {
    return (
        <div className="container mt-4">
            {}
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <div className="d-flex gap-3">
                        <div className="flex-grow-1">
                            <textarea
                            className="form-control"    
                            placeholder="¿Qué estás pensando?"
                            rows={3}>
                            </textarea>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-danger fw-bold px-4">Postear</button>
                    </div>
                </div>
            </div>
            {}
            {[1, 2, 3].map((i) => (
                <div className="card mb-3 shadow-sm" key={i}>
                    <div className="card-body">
                        <h5 className="fw-bold text-danger">Usuario {i}</h5>
                        <p>
                            Este es un ejemplo de publicación número {i}.  
                            Aquí iría el contenido del post tal como funciona en X.
                        </p>
                        <div className="d-flex gap-4 mt-3">
                            <button className="btn btn-light border">
                                👍 Me gusta
                            </button>
                            <button className="btn btn-light border">
                                💬 Comentar
                            </button>
                            <button className="btn btn-light border">
                                🔁 Compartir
                            </button>
                    </div>
                </div>
        </div>
    ))}
    </div>
    ); 
};
export default Home;
