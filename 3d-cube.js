// 3D Cube Animation
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.domElement.classList.add('floating-cube');
    hero.appendChild(renderer.domElement);

    // Create a cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x3498db,
        wireframe: true 
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Mouse move animation
    hero.addEventListener('mousemove', (e) => {
        cube.rotation.x = (e.clientY / window.innerHeight) * 2;
        cube.rotation.y = (e.clientX / window.innerWidth) * 2;
    });

    // Animate
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animate();
});