<template>
    <div class="container">
        <header class="header">
            <nav class="navbar">
                <a href="#" class="logo">RefManager</a>
                <ul class="nav-links">
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Sobre Nosotros</a></li>
                    <li><a href="#">Servicios</a></li>
                    <li><a href="#">Contacto</a></li>
                </ul>
            </nav>
        </header>

        <main class="main">
            <section class="hero">
                <h1>Bienvenido a RefManager</h1>
                <p>Tu herramienta definitiva para la creación y gestión de referencias bibliográficas.</p>
                <router-link to="/fuentes">
                    <button class="cta-button">Comienza Ahora</button>
                </router-link>
            </section>

            <section class="description">
                <h2>¿Qué es RefManager?</h2>
                <p>
                    RefManager es un sistema innovador diseñado para ayudarte a crear, organizar y gestionar todas tus
                    referencias bibliográficas de manera eficiente y efectiva. Ya seas un estudiante, investigador o
                    profesional, nuestra plataforma facilita la recopilación y el formato de tus referencias según los
                    estándares más utilizados.
                </p>
            </section>

            <section class="features">
                <div class="feature">
                    <div class="card">
                        <h2>Calidad</h2>
                        <p>Nuestros productos son de la más alta calidad.</p>
                    </div>
                </div>
                <div class="feature">
                    <div class="card">
                        <h2>Innovación</h2>
                        <p>Siempre estamos a la vanguardia de la tecnología.</p>
                    </div>
                </div>
                <div class="feature">
                    <div class="card">
                        <h2>Soporte</h2>
                        <p>Ofrecemos soporte 24/7 a nuestros clientes.</p>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
};
</script>

<style scoped>
.container {
    font-family: Arial, sans-serif;
    color: #333;
}

.header {
    background-color: #4caf50;
    padding: 10px 0;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.logo {
    color: white;
    font-size: 24px;
    text-decoration: none;
}

.nav-links {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
}

.nav-links li {
    margin-left: 20px;
}

.nav-links a {
    color: white;
    text-decoration: none;
    font-size: 18px;
}

.main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.hero {
    text-align: center;
    padding: 50px 20px;
    background: #f7f7f7;
    margin-bottom: 30px;
}

.hero h1 {
    font-size: 48px;
    margin-bottom: 10px;
}

.hero p {
    font-size: 20px;
    margin-bottom: 20px;
}

.cta-button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.cta-button:hover {
    background-color: #45a049;
}

.description {
    text-align: center;
    padding: 20px;
    margin-bottom: 30px;
}

.description h2 {
    font-size: 36px;
    margin-bottom: 20px;
}

.description p {
    font-size: 18px;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
}

.features {
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;
}

.feature {
    flex: 1;
    margin: 0 10px;
}

.card {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    transition: box-shadow 0.3s ease;
}

.card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
}

.feature h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

.feature p {
    font-size: 16px;
}
</style>
