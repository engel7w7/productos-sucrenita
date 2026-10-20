import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-sucrenita-900 text-sucrenita-100 border-t border-sucrenita-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 md:col-span-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-sucrenita-gold">✦</span> Sucrenita
            </span>
            <p className="text-sm text-sucrenita-300 max-w-md leading-relaxed">
              Tradición, arte chocolatero y repostería artesanal nacida en la capital histórica de Bolivia.
              Cada pieza encarna la herencia culinaria y la dulzura característica de Sucre.
            </p>
            <div className="pt-2 text-xs text-sucrenita-400">
              📍 Calle Nicolás Ortiz &bull; Sucre, Chuquisaca, Bolivia
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs text-sucrenita-300">
              <li>
                <Link href="/" className="hover:text-sucrenita-gold transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-sucrenita-gold transition-colors">
                  Catálogo Completo
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=chocolates-tradicionales" className="hover:text-sucrenita-gold transition-colors">
                  Chocolates Finos
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=alfajores-galletas" className="hover:text-sucrenita-gold transition-colors">
                  Alfajores Sucrenses
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4">
              Garantía & Envíos
            </h4>
            <ul className="space-y-2 text-xs text-sucrenita-300">
              <li>Envío refrigerado nacional</li>
              <li>Pedidos corporativos e institucionales</li>
              <li>Ingredientes 100% naturales</li>
              <li>Cacao silvestre boliviano de origen</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-sucrenita-800 flex flex-col sm:flex-row items-center justify-between text-xs text-sucrenita-400 gap-4">
          <p>&copy; {new Date().getFullYear()} Sucrenita. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con pasión en Sucre, Bolivia.
          </p>
        </div>
      </div>
    </footer>
  );
}
