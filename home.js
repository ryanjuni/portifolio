/**
 * HOME.JS - Versão Interativa Simplificada
 * Fundo sólido + Rastro do Mouse + Cursor Personalizado
 */

class App {
    constructor() {
        // 1. Setup do Renderizador
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        document.body.appendChild(this.renderer.domElement);
        this.renderer.domElement.id = "webGLApp";

        // 2. Cena e Câmera
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0e27); // Azul marinho sólido

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 50;

        // 3. Elementos de UI (Cursor e Mouse)
        this.cursorEl = document.getElementById("customCursor");
        this.mouse = new THREE.Vector2(0, 0);
        this.lastMouse = new THREE.Vector2(0, 0);

        this.init();
    }

    init() {
        this.addEventListeners();
        this.render();
        console.log("Sistema iniciado: Fundo limpo com interatividade preservada.");
    }

    addEventListeners() {
        // Redimensionamento dinâmico
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Movimentação do Mouse e Cursor
        window.addEventListener('mousemove', (e) => {
            // Coordenadas normalizadas para o Three.js
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

            // Atualiza o Cursor Personalizado (DOM)
            if (this.cursorEl) {
                // Usando requestAnimationFrame implicitamente via transição suave de CSS ou direta:
                this.cursorEl.style.left = `${e.clientX}px`;
                this.cursorEl.style.top = `${e.clientY}px`;
            }

            // Lógica de "Hover" em links (Efeito que tinha antes)
            const target = e.target;
            if (target.tagName === 'A' || target.classList.contains('interactive')) {
                this.cursorEl?.classList.add('cursor-hover');
            } else {
                this.cursorEl?.classList.remove('cursor-hover');
            }
        });

        // Efeitos de clique
        window.addEventListener('mousedown', () => this.cursorEl?.classList.add('cursor-active'));
        window.addEventListener('mouseup', () => this.cursorEl?.classList.remove('cursor-active'));

        // Troca de Cores de Fundo (Exemplo de integração com seus botões)
        const colorButtons = document.querySelectorAll('.color-picker');
        colorButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const newHex = e.currentTarget.getAttribute('data-color');
                if (newHex) this.scene.background.set(newHex);
            });
        });
    }

    // Loop de Renderização
    render() {
        // Aqui você pode adicionar pequenos objetos 3D flutuando se quiser no futuro
        this.renderer.render(this.scene, this.camera);
        
        requestAnimationFrame(() => this.render());
    }
}

// Inicializa a classe quando o documento carregar
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});