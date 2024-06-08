// script.js
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('banner');
    const sailboat = document.getElementById('sailboat');

    let waveOffset = 0;  // For controlling vertical oscillation
    let targetX = sailboat.offsetLeft;
    let targetY = sailboat.offsetTop;
    let currentX = sailboat.offsetLeft;
    let currentY = sailboat.offsetTop;
    const speed = 0.001;  // Easing speed for smoother movement

    banner.addEventListener('mousemove', (e) => {
        const bannerRect = banner.getBoundingClientRect();
        // Calculate the new target positions relative to the banner
        targetX = e.clientX - bannerRect.left;
    });

    function ease(current, target, easeFactor) {
        return current + (target - current) * easeFactor;
    }

    function animate() {
        // Calculate vertical wave motion
        waveOffset += 0.05;
        const waveHeight = Math.sin(waveOffset) * 10;  // Adjust the wave height for realism
        const bannerMidY = banner.offsetHeight / 2;
        targetY = bannerMidY + waveHeight;

        // Ease the sailboat's position towards the target positions
        currentX = ease(currentX, targetX, speed);
        currentY = ease(currentY, targetY, speed);

        sailboat.style.left = `${currentX}px`;
        sailboat.style.top = `${currentY}px`;

        // Calculate the rotation angle based on the wave height
        const rotationAngle = Math.sin(waveOffset) * 5;  // Adjust for desired rotation effect

        // Flip the sailboat based on the cursor position relative to the sailboat
        if (targetX > currentX) {
            sailboat.style.transform = `translate(-50%, -50%) scaleX(1) rotate(${rotationAngle}deg)`;
        } else {
            sailboat.style.transform = `translate(-50%, -50%) scaleX(-1) rotate(${rotationAngle}deg)`;
        }

        requestAnimationFrame(animate);
    }

    animate();
});