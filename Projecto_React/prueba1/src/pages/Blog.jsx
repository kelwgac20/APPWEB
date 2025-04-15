import { useEffect, useState } from "react";

export default function Blog() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(data => setPosts(data.slice(0, 10))) // solo los 10 primeros
            .catch(error => console.error("Error al cargar los posts", error));
    }, []);

    return (
        <div>
            <h2>📝 Bienvenido a mi Blog</h2>
            {posts.length === 0 ? (
                <p>Cargando publicaciones...</p>
            ) : (
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <img
                                src={`https://picsum.photos/seed/${post.id}/400/200`}
                                alt="Imagen aleatoria"
                                style={{ width: "100%", borderRadius: "8px" }}
                            />
                            <p>{post.body}</p>
                        </li>
                    ))}
 
                    ))}
                </ul>
            )}
        </div>
    );
}