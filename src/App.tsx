import { useMemo, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import {
  ArrowDownToLine, ArrowUpRight, CalendarDays, Check, ChevronDown,
  CircleHelp, Clock3, ImagePlus, LayoutDashboard, Leaf, Library,
  Plus, Search, Settings2, Sparkles, WandSparkles, X
} from 'lucide-react';

type Product = { id: number; name: string; category: string; description: string; accent: string };
type Section = 'Overview' | 'Poster Studio' | 'Product Library' | 'Content Calendar' | 'Brand Memory';

const starterProducts: Product[] = [
  { id: 1, name: 'Kadukkai', category: 'Indian Raw Drugs', description: 'Naturally dried kadukkai for wholesale and retail supply.', accent: 'Kadukkai' },
  { id: 2, name: 'Avarampoo', category: 'Herbal Products', description: 'Traditional dried avarampoo flowers.', accent: 'Avarampoo' },
  { id: 3, name: 'Indira Premium Dhoop Sticks', category: 'Pooja Essentials', description: 'A fragrant range for everyday pooja and special occasions.', accent: 'Indira' },
  { id: 4, name: 'Dipak Sambrani', category: 'Pooja Essentials', description: 'A traditional sambrani product from Dipak.', accent: 'Dipak' },
  { id: 5, name: 'Shikakai', category: 'Herbal Products', description: 'Traditional herbal hair-care ingredient.', accent: 'Shikakai' },
];

const initialPromos = [
  { day: 'TODAY', date: '02', month: 'NOV', title: 'Product spotlight', product: 'Kadukkai', status: 'Ready to create' },
  { day: 'TUE', date: '03', month: 'NOV', title: 'Herbal essentials', product: 'Avarampoo', status: 'Planned' },
  { day: 'WED', date: '04', month: 'NOV', title: 'Pooja collection', product: 'Indira Dhoop Sticks', status: 'Planned' },
];

function App() {
  const [section, setSection] = useState<Section>('Overview');
  const [products, setProducts] = useState<Product[]>(() => {
    try { return JSON.parse(localStorage.getItem('ksc-products') || 'null') || starterProducts; }
    catch { return starterProducts; }
  });
  const [selectedProduct, setSelectedProduct] = useState('Kadukkai');
  const [headline, setHeadline] = useState('THE BEAUTY OF TRADITION');
  const [subline, setSubline] = useState('Naturally sourced. Carefully selected.');
  const [format, setFormat] = useState<'Instagram Post' | 'Story'>('Instagram Post');
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Indian Raw Drugs');
  const [toast, setToast] = useState('');
  const posterRef = useRef<HTMLDivElement>(null);

  const activeProduct = products.find(p => p.name === selectedProduct) || products[0];
  const filteredProducts = useMemo(() => products.filter(p => (p.name + p.category).toLowerCase().includes(search.toLowerCase())), [products, search]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  }
  function saveProducts(next: Product[]) {
    setProducts(next);
    localStorage.setItem('ksc-products', JSON.stringify(next));
  }
  function addProduct() {
    if (!newName.trim()) return;
    const next = [...products, { id: Date.now(), name: newName.trim(), category: newCategory, description: 'Add product details and photography to complete this entry.', accent: newName.trim() }];
    saveProducts(next); setSelectedProduct(newName.trim()); setNewName(''); setShowAdd(false); notify('Product added to your library');
  }
  async function downloadPoster() {
    if (!posterRef.current) return;
    try {
      const data = await toPng(posterRef.current, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement('a');
      link.download = `KSC-${activeProduct?.name.replace(/[^a-z0-9]/gi, '-') || 'poster'}.png`;
      link.href = data; link.click(); notify('Poster downloaded');
    } catch { notify('Could not export poster. Please try again.'); }
  }

  const nav = [
    { label: 'Overview' as Section, icon: LayoutDashboard, group: 'WORKSPACE' },
    { label: 'Poster Studio' as Section, icon: ImagePlus, group: 'WORKSPACE' },
    { label: 'Product Library' as Section, icon: Library, group: 'LIBRARY' },
    { label: 'Content Calendar' as Section, icon: CalendarDays, group: 'LIBRARY' },
    { label: 'Brand Memory' as Section, icon: Sparkles, group: 'SETTINGS' },
  ];

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand-lockup"><div className="brand-mark">KSC</div><div><strong>JARVIS</strong><span>MARKETING STUDIO</span></div></div>
      <div className="workspace-chip"><span className="workspace-dot" /> K. Somu Chetty & Co. <ChevronDown size={14}/></div>
      {['WORKSPACE', 'LIBRARY', 'SETTINGS'].map(group => <div className="nav-group" key={group}>
        <p className="nav-caption">{group}</p>
        {nav.filter(item => item.group === group).map(item => <button key={item.label} className={`nav-item ${section === item.label ? 'active' : ''}`} onClick={() => setSection(item.label)}><item.icon size={17}/><span>{item.label}</span>{item.label === 'Poster Studio' && <span className="nav-new">NEW</span>}</button>)}
      </div>)}
      <div className="sidebar-bottom"><div className="help-card"><CircleHelp size={18}/><div><strong>Need a hand?</strong><span>Your marketing workspace</span></div><ArrowUpRight size={14}/></div><div className="profile"><div className="avatar">K</div><div><strong>KSC Team</strong><span>Business workspace</span></div><Settings2 size={16}/></div></div>
    </aside>

    <main className="main-area">
      <header className="topbar"><div className="breadcrumb">KSC WORKSPACE <span>/</span> <strong>{section.toUpperCase()}</strong></div><div className="top-actions"><span className="today-label"><span className="live-dot"/> YOUR DAILY CREATIVE SPACE</span><button className="icon-button" title="Settings"><Settings2 size={18}/></button><div className="avatar small">K</div></div></header>
      {section === 'Overview' && <div className="page-content">
        <div className="welcome-row"><div><p className="eyebrow">MONDAY, 02 NOVEMBER 2026</p><h1>Good afternoon.<br/><em>Let's make something memorable.</em></h1><p className="muted intro">Your daily marketing desk for K. Somu Chetty & Co.</p></div><button className="primary-button" onClick={() => setSection('Poster Studio')}><WandSparkles size={16}/> Create today's poster</button></div>
        <div className="stat-grid"><div className="stat-card"><span className="stat-label">PRODUCTS IN LIBRARY</span><strong>{products.length.toString().padStart(2,'0')}</strong><span className="stat-foot"><Library size={14}/> Your product collection</span></div><div className="stat-card"><span className="stat-label">DAILY PROMOTION</span><strong>01 <small>/ day</small></strong><span className="stat-foot"><Clock3 size={14}/> Daily creative goal</span></div><div className="stat-card"><span className="stat-label">BRAND PROFILE</span><strong className="complete"><Check size={19}/> Saved</strong><span className="stat-foot"><Sparkles size={14}/> Core design rules loaded</span></div></div>
        <div className="section-heading"><div><p className="eyebrow">YOUR WORKFLOW</p><h2>Make today count</h2></div><button className="text-button" onClick={() => setSection('Content Calendar')}>View calendar <ArrowUpRight size={15}/></button></div>
        <div className="feature-grid"><button className="feature-card feature-main" onClick={() => setSection('Poster Studio')}><div className="feature-icon gold"><ImagePlus size={20}/></div><span className="feature-tag">01 / CREATE</span><h3>Poster Studio</h3><p>Turn a product into a polished promotional visual, ready to share.</p><span className="feature-link">Open studio <ArrowUpRight size={15}/></span><div className="feature-orbit">✳</div></button><button className="feature-card" onClick={() => setSection('Product Library')}><div className="feature-icon"><Library size={20}/></div><span className="feature-tag">02 / ORGANISE</span><h3>Product Library</h3><p>Keep your product names, categories and descriptions in one place.</p><span className="feature-link">Explore products <ArrowUpRight size={15}/></span></button><button className="feature-card" onClick={() => setSection('Brand Memory')}><div className="feature-icon"><Sparkles size={20}/></div><span className="feature-tag">03 / STAY CONSISTENT</span><h3>Brand Memory</h3><p>Your KSC design principles, ready whenever you create.</p><span className="feature-link">View brand rules <ArrowUpRight size={15}/></span></button></div>
        <div className="section-heading calendar-heading"><div><p className="eyebrow">UP NEXT</p><h2>Coming up in your calendar</h2></div><span className="muted tiny">A suggested starting plan</span></div>
        <div className="schedule-list">{initialPromos.map(item => <div className="schedule-row" key={item.date}><div className="schedule-date"><span>{item.day}</span><strong>{item.date}</strong><span>{item.month}</span></div><div className="schedule-info"><strong>{item.title}</strong><span>{item.product}</span></div><span className="schedule-status">{item.status}</span><ArrowUpRight size={16}/></div>)}</div>
        <p className="footnote">A first look at your workspace. Automated daily creation will be connected in a later milestone.</p>
      </div>}

      {section === 'Poster Studio' && <div className="page-content">
        <div className="page-title-row"><div><p className="eyebrow">CREATIVE WORKSPACE / 01</p><h1>Poster <em>Studio</em></h1><p className="muted">Compose a clean, premium product promotion.</p></div><button className="primary-button" onClick={downloadPoster}><ArrowDownToLine size={16}/> Download PNG</button></div>
        <div className="studio-layout"><div className="editor-panel"><div className="panel-heading"><div><span className="eyebrow">01 / CONTENT</span><h3>Poster details</h3></div><Sparkles size={18}/></div><label>FEATURED PRODUCT</label><select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>{products.map(p => <option key={p.id}>{p.name}</option>)}</select><label>HEADLINE</label><input value={headline} onChange={e => setHeadline(e.target.value)} maxLength={42}/><label>SUPPORTING COPY</label><textarea value={subline} onChange={e => setSubline(e.target.value)} rows={3} maxLength={100}/><label>FORMAT</label><div className="format-switch"><button className={format === 'Instagram Post' ? 'selected' : ''} onClick={() => setFormat('Instagram Post')}>Square post <span>1:1</span></button><button className={format === 'Story' ? 'selected' : ''} onClick={() => setFormat('Story')}>Story <span>9:16</span></button></div><div className="editor-note"><Sparkles size={16}/><p><strong>Design note</strong><br/>This is a starter template. AI-generated product photography and copy suggestions will be added in the next build.</p></div></div>
          <div className="preview-area"><div className="preview-topline"><span>LIVE PREVIEW</span><span>01 / 01 <span className="preview-dot"/></span></div><div className={`poster-frame-wrap ${format === 'Story' ? 'story-wrap' : ''}`}><div ref={posterRef} className={`poster-art ${format === 'Story' ? 'poster-story' : ''}`}><div className="poster-border"><div className="poster-top"><div className="poster-logo">KSC</div><span>K. SOMU CHETTY & CO.</span><i>EST. 1916</i></div><div className="poster-kicker">A LEGACY OF QUALITY</div><div className="poster-rule"/><div className="poster-copy"><h2>{headline || 'YOUR HEADLINE HERE'}</h2><p>{subline || 'Your supporting message goes here.'}</p></div><div className="poster-product-stage"><div className="product-halo"/><div className="product-illustration"><Leaf size={76} strokeWidth={0.8}/><span>{activeProduct?.accent || 'PRODUCT'}</span></div><span className="stage-caption">NATURAL • AUTHENTIC • TRUSTED</span></div><div className="poster-bottom"><strong>{activeProduct?.name || 'Featured product'}</strong><span>{activeProduct?.category || 'KSC COLLECTION'}</span><div className="poster-contact">WHOLESALE · RETAIL · BULK SUPPLY</div><small>CHENNAI, TAMIL NADU</small></div></div></div></div><p className="preview-help">Your logo is represented by a text placeholder until the original logo file is added.</p></div></div>
      </div>}

      {section === 'Product Library' && <div className="page-content"><div className="page-title-row"><div><p className="eyebrow">YOUR CATALOGUE / 02</p><h1>Product <em>Library</em></h1><p className="muted">A growing home for your wholesale and retail range.</p></div><button className="primary-button" onClick={() => setShowAdd(true)}><Plus size={16}/> Add product</button></div><div className="library-toolbar"><div className="search-box"><Search size={16}/><input placeholder="Search products or categories..." value={search} onChange={e => setSearch(e.target.value)}/></div><span>{filteredProducts.length} PRODUCTS</span></div><div className="product-grid">{filteredProducts.map(product => <div className="product-card" key={product.id}><div className="product-card-art"><div className="product-card-mark"><Leaf size={30}/></div><span>KSC / COLLECTION</span></div><div className="product-card-info"><span className="category-pill">{product.category}</span><h3>{product.name}</h3><p>{product.description}</p><button onClick={() => {setSelectedProduct(product.name);setSection('Poster Studio')}}>Create promotion <ArrowUpRight size={14}/></button></div></div>)}</div>{filteredProducts.length === 0 && <div className="empty-state">No products match your search.</div>}</div>}

      {section === 'Content Calendar' && <div className="page-content"><div className="page-title-row"><div><p className="eyebrow">PLAN WITH PURPOSE / 03</p><h1>Content <em>Calendar</em></h1><p className="muted">A simple rhythm for showing up every day.</p></div><span className="calendar-month">NOVEMBER 2026</span></div><div className="calendar-note"><CalendarDays size={20}/><div><strong>Your daily promotion rhythm</strong><p>One product story each day. Review the suggested products, then open Poster Studio to create the artwork.</p></div></div><div className="calendar-cards">{initialPromos.map((item, i) => <div className="calendar-card" key={item.date}><div className="calendar-date"><span>{item.day}</span><strong>{item.date}</strong><small>{item.month}</small></div><div><span className="eyebrow">DAILY FEATURE / 0{i+1}</span><h3>{item.product}</h3><p>{item.title}</p><span className="calendar-status">{item.status}</span></div><button onClick={() => {setSelectedProduct(products.find(p => p.name.toLowerCase().includes(item.product.split(' ')[0].toLowerCase()))?.name || products[0]?.name);setSection('Poster Studio')}}>Create poster <ArrowUpRight size={14}/></button></div>)}</div><p className="footnote">Calendar entries are sample suggestions, not scheduled or automatically published posts.</p></div>}

      {section === 'Brand Memory' && <div className="page-content"><div className="page-title-row"><div><p className="eyebrow">THE KSC IDENTITY / 04</p><h1>Brand <em>Memory</em></h1><p className="muted">The creative principles that keep every KSC promotion recognisable.</p></div><span className="saved-label"><Check size={15}/> PROJECT GUIDELINES</span></div><div className="brand-memory-grid"><div className="memory-card"><span className="memory-number">01</span><h3>Visual character</h3><p>Premium, minimal and elegant. Use warm cream or off-white backgrounds with restrained gold accents. Keep layouts uncluttered and balanced.</p></div><div className="memory-card"><span className="memory-number">02</span><h3>Logo integrity</h3><p>Use the original KSC logo without recreating, stretching, recolouring or modifying it. Prefer a neat position near the top-left or top area.</p></div><div className="memory-card"><span className="memory-number">03</span><h3>Product photography</h3><p>Use natural-looking, photorealistic product photography with a professional photoshoot feel. Avoid unrelated decorative leaves or generic stock visuals.</p></div><div className="memory-card"><span className="memory-number">04</span><h3>Typography & copy</h3><p>Make the English company name prominent. Use concise product-led headlines and minimal supporting copy. Keep product names easy to read.</p></div><div className="memory-card"><span className="memory-number">05</span><h3>What to avoid</h3><p>Avoid dark or black backgrounds, clutter, duplicate company names, unapproved logo variants and unrelated celebrity imagery.</p></div><div className="memory-card"><span className="memory-number">06</span><h3>Business context</h3><p>K. Somu Chetty & Co. is a Chennai business established in 1916, supplying Indian raw drugs, herbs, pooja essentials, wax, sambrani and related products.</p></div></div><div className="memory-footer"><Sparkles size={18}/><p>These guidelines are stored in the project documentation. This screen is a readable reference; editable cloud brand settings will be added later.</p></div></div>}
    </main>
    {toast && <div className="toast"><Check size={16}/>{toast}</div>}
    {showAdd && <div className="modal-backdrop" onClick={() => setShowAdd(false)}><div className="modal" onClick={e => e.stopPropagation()}><div className="modal-heading"><div><span className="eyebrow">PRODUCT LIBRARY</span><h2>Add a product</h2></div><button className="icon-button" onClick={() => setShowAdd(false)}><X size={18}/></button></div><label>PRODUCT NAME</label><input autoFocus value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Vetiver"/><label>CATEGORY</label><select value={newCategory} onChange={e => setNewCategory(e.target.value)}><option>Indian Raw Drugs</option><option>Herbal Products</option><option>Pooja Essentials</option><option>Wax & Materials</option><option>Other</option></select><div className="modal-actions"><button className="secondary-button" onClick={() => setShowAdd(false)}>Cancel</button><button className="primary-button" onClick={addProduct} disabled={!newName.trim()}><Plus size={15}/> Add product</button></div></div></div>}
  </div>;
}

export default App;
