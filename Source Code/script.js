 document.addEventListener('DOMContentLoaded', function() {
            const imageUrls = [
                "https://image.tmdb.org/t/p/w300/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
                "https://posters.movieposterdb.com/25_04/2025/12908150/l_the-life-of-chuck-movie-poster_305eac0f.jpg",
                "https://image.tmdb.org/t/p/w300/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
                "https://image.tmdb.org/t/p/w300/wRbjVBdDo5qHAEOVYoMWpM58FSA.jpg",
                "https://posters.movieposterdb.com/25_03/2025/32246771/l_bring-her-back-movie-poster_89f50c57.jpeg",
                "https://posters.movieposterdb.com/25_04/2025/31193180/l_sinners-movie-poster_3fa9e5fc.jpg",
                "https://image.tmdb.org/t/p/w300/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
                "https://image.tmdb.org/t/p/w300/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
                "https://posters.movieposterdb.com/25_04/2025/30840798/l_the-phoenician-scheme-movie-poster_d5d4052e.jpg",
                "https://image.tmdb.org/t/p/w300/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
                "https://posters.movieposterdb.com/25_04/2025/7181546/l_ballerina-movie-poster_5c124fce.jpg",
                "https://posters.movieposterdb.com/25_03/2025/30253473/l_materialists-movie-poster_5da91aec.jpg",
                "https://posters.movieposterdb.com/25_05/2025/11655566/l_lilo-stitch-movie-poster_ae4d4356.jpg",
                "https://image.tmdb.org/t/p/w300/6kbAMLteGO8yyewYau6bJ683sw7.jpg",
                "https://image.tmdb.org/t/p/w300/9PqD3wSIjntyJDBzMNuxuKHwpUD.jpg"
            ];
            
            const leftSlider = document.getElementById('leftSlider');
            const rightSlider = document.getElementById('rightSlider');
            
            // Calculate how many rows we need to fill the screen plus buffer
            const viewportHeight = window.innerHeight;
            const itemHeight = (window.innerWidth * 0.5 * 0.1666) * (3/2); // width * aspect ratio
            const rowsNeeded = Math.ceil(viewportHeight / itemHeight) * 2;
            
            // Populate sliders with enough rows to ensure seamless looping
            function populateSlider(slider, startIndex = 0) {
                for (let i = 0; i < rowsNeeded; i++) {
                    const row = document.createElement('div');
                    row.className = 'slider-row';
                    
                    // Different start index for variety
                    const offset = (startIndex + i) * 3 % imageUrls.length;
                    
                    for (let j = 0; j < 6; j++) {
                        const item = document.createElement('div');
                        item.className = 'slider-item';
                        
                        const imgIndex = (offset + j) % imageUrls.length;
                        const img = document.createElement('img');
                        img.src = imageUrls[imgIndex];
                        img.alt = `Movie ${imgIndex + 1}`;
                        
                        item.appendChild(img);
                        row.appendChild(item);
                    }
                    
                    // Add duplicate row at the end for seamless looping
                    if (i === rowsNeeded - 1) {
                        slider.appendChild(row.cloneNode(true));
                    } else {
                        slider.appendChild(row);
                    }
                }
            }
            
            // Different start positions for variety
            populateSlider(leftSlider, 0);
            populateSlider(rightSlider, Math.floor(imageUrls.length/2));
            
            // Pause on hover
            [leftSlider, rightSlider].forEach(slider => {
                slider.addEventListener('mouseenter', () => {
                    slider.style.animationPlayState = 'paused';
                });
                
                slider.addEventListener('mouseleave', () => {
                    slider.style.animationPlayState = 'running';
                });
            });
            
            // Adjust on resize
            window.addEventListener('resize', function() {
                const newViewportHeight = window.innerHeight;
                const newItemHeight = (window.innerWidth * 0.5 * 0.1666) * (3/2);
                const newRowsNeeded = Math.ceil(newViewportHeight / newItemHeight) * 2;
                
                if (newRowsNeeded !== rowsNeeded) {
                    leftSlider.innerHTML = '';
                    rightSlider.innerHTML = '';
                    populateSlider(leftSlider, 0);
                    populateSlider(rightSlider, Math.floor(imageUrls.length/2));
                }
            });
        });