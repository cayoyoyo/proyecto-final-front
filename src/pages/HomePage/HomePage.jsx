import "./HomePage.css";
import InboxPage from "../chatBox";
import { Link } from "react-router-dom";

function HomePage() {
  const premiumProducts = [
    {
      id: 1,
      category: 'Electrónica',
      title: 'Smartphone de última generación',
      date: 'Nov 15',
      description: 'Este smartphone cuenta con las últimas características y un rendimiento excepcional.',
      thumbnail: 'https://media.ldlc.com/r1600/ld/products/00/05/97/77/LD0005977700.jpg',
    },
    {
      id: 2,
      category: 'Moda',
      title: 'Zapatos de diseñador',
      date: 'Nov 14',
      description: 'Los zapatos de diseñador más elegantes y cómodos que encontrarás.',
      thumbnail: 'https://img.joomcdn.net/56d1089062c82987b54ca70cf588f6fb7d904dd1_original.jpeg',
    },
    {
      id: 3,
      category: 'Hogar y Jardín',
      title: 'Muebles de lujo',
      date: 'Nov 13',
      description: 'Decora tu hogar con estos muebles de lujo y estilo.',
      thumbnail: 'https://img5.su-cdn.com/cdn-cgi/image/width=600,height=600,format=webp/mall/file/2021/05/14/41a7551b9d4e438fbcac187630584436.jpg',
    },
    // Agrega más productos premium aquí
    {
      id: 10,
      category: 'Electrónica',
      title: 'Auriculares inalámbricos de alta calidad',
      date: 'Nov 10',
      description: 'Disfruta de la mejor calidad de sonido con estos auriculares inalámbricos.',
      thumbnail: 'https://www.macysdigital.com/wp-content/uploads/2023/04/JBL-TUNE-720BT-azul-1.png',
    },
  ];


  return (
    <main>
      <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://images.pexels.com/photos/583842/pexels-photo-583842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Descripción de la imagen" className="d-block w-100" width="100%" height="100%" />

            {/* <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)" />
              <image src="https://i.pinimg.com/564x/97/77/06/9777063d2d86c0fba3e74cf2eda640b0.jpg" ></image>
            </svg> */}
            <div class="container">
              <div class="carousel-caption text-start">
                <h1>Eletronicos de calidad!</h1>

                <p><Link class="btn btn-lg btn-primary" to="/products">Eletronicos</Link></p>
              </div>
            </div>
          </div>

          <div class="carousel-item">
            <img src="https://images.pexels.com/photos/2177482/pexels-photo-2177482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Descripción de la imagen" className="d-block w-100" width="100%" height="50%" />

            {/* <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)" /></svg> */}
            <div class="container">
              <div class="carousel-caption">
                <h1>Another example headline.</h1>
                <p>Some representative placeholder content for the second slide of the carousel.</p>
                <p><a class="btn btn-lg btn-primary" href="#">Learn more</a></p>
              </div>
            </div>
          </div>

          <div class="carousel-item">

            <img src="https://i.pinimg.com/564x/33/e5/65/33e56550ff260c55974971103c4a7767.jpg" alt="Descripción de la imagen" className="d-block w-100" width="100%" height="50%" />

            {/* <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)" /></svg> */}
            <div class="container">
              <div class="carousel-caption text-end">
                <h1>One more for good measure.</h1>
                <p>Some representative placeholder content for the third slide of this carousel.</p>
                <p><a class="btn btn-lg btn-primary" href="#">Browse gallery</a></p>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      {/* ----------------------------------------------------------------------------------------test ---------------- */}



      {/* ------------ copia  --------------- */}



      <div className="row mb-2">
        {premiumProducts.map((product) => (
          <div className="col-md-6" key={product.id}>
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary-emphasis">{product.category}</strong>
                <h3 className="mb-0">{product.title}</h3>
                <div className="mb-1 text-body-secondary">{product.date}</div>
                <p className="card-text mb-auto">{product.description}</p>
                <a href="#" className="icon-link gap-1 icon-link-hover stretched-link">
                  Continue reading
                  <svg className="bi"><use xlinkHref="#chevron-right" /></svg>
                </a>
              </div>
              <div className="col-auto d-none d-lg-block">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  width="200"
                  height="250"
                />
              </div>
            </div>
          </div>
        ))}
      </div>


    </main>
  );
}

export default HomePage;
