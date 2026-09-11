"use client";

import { motion } from "framer-motion";
import {
  ArrowRight, BarChart3, CalendarDays, CheckCircle2, Code2, Gauge,
  LayoutDashboard, Lock, Menu, MonitorSmartphone, Palette, Rocket,
  Search, ShieldCheck, ShoppingBag, Sparkles, Store, WandSparkles,
  MessageCircle, Smartphone, TrendingUp, Users, X
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Counter from "@/components/Counter";
import MouseGlow from "@/components/MouseGlow";

const services = [
  { icon: Code2, title: "Desenvolvimento de Sites", text: "Sites rápidos, modernos e personalizados para sua empresa." },
  { icon: LayoutDashboard, title: "Sistemas Empresariais", text: "Soluções sob medida para organizar e automatizar processos." },
  { icon: ShoppingBag, title: "Lojas Virtuais", text: "Venda online com uma experiência moderna, clara e profissional." },
  { icon: CalendarDays, title: "Sistemas de Agendamento", text: "Permita que clientes escolham serviços e horários diretamente pelo site." },
  { icon: BarChart3, title: "Painéis Administrativos", text: "Controle produtos, clientes, vendas, horários e informações em um só lugar." },
  { icon: Rocket, title: "Landing Pages", text: "Páginas de alta conversão para campanhas, lançamentos e captação de leads." },
];

const differentials = [
  [Gauge, "Alta performance"],
  [Smartphone, "Responsividade"],
  [Palette, "Design personalizado"],
  [ShieldCheck, "Segurança"],
  [Rocket, "Tecnologia moderna"],
  [TrendingUp, "Foco em resultados"],
  [MessageCircle, "Atendimento personalizado"],
];

const process = [
  ["01", "Planejamento", "Entendemos seu negócio, seus objetivos e o que você precisa."],
  ["02", "Design", "Criamos uma experiência moderna, elegante e profissional."],
  ["03", "Desenvolvimento", "Transformamos o projeto em uma solução rápida, segura e responsiva."],
  ["04", "Testes", "Validamos funcionamento, desempenho e compatibilidade."],
  ["05", "Publicação", "Colocamos seu projeto oficialmente no ar."],
  ["06", "Suporte", "Continuamos disponíveis após a entrega."],
];

export default function Home() {
  const words = useMemo(() => ["Sites", "Sistemas", "Lojas Virtuais", "Experiências Digitais"], []);
  const [word, setWord] = useState(0);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setWord(v => (v + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <main>
      <MouseGlow />

      <header className="nav">
        <a className="brand" href="#inicio"><span className="brand-mark">H</span><span>HYPER STUDIO</span></a>
        <button className="mobile-menu" onClick={() => setMenu(v => !v)} aria-label="Abrir menu">
          {menu ? <X size={22}/> : <Menu size={22}/>}
        </button>
        <nav className={menu ? "nav-links open" : "nav-links"}>
          {["Início","Serviços","Projetos","Sobre","Processo","Contato"].map((x,i)=>
            <a key={x} href={"#"+["inicio","servicos","projetos","sobre","processo","contato"][i]} onClick={()=>setMenu(false)}>{x}</a>
          )}
          <a className="btn small" href="#contato">Solicitar orçamento</a>
        </nav>
      </header>

      <section className="hero section" id="inicio">
        <div className="grid-bg" />
        <motion.div className="hero-copy" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
          <span className="eyebrow"><Sparkles size={15}/> Tecnologia, design e performance</span>
          <h1>Transformamos ideias em <span>experiências digitais.</span></h1>
          <div className="type-line">Criamos <motion.strong key={word} initial={{opacity:0,y:12,filter:"blur(6px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}}>{words[word]}</motion.strong></div>
          <p>Desenvolvemos sites e sistemas modernos, rápidos e personalizados para empresas que querem crescer no digital.</p>
          <div className="hero-actions">
            <a className="btn" href="#contato">Solicitar orçamento <ArrowRight size={18}/></a>
            <a className="btn ghost" href="#projetos">Ver projetos</a>
          </div>
        </motion.div>

        <motion.div className="hero-visual" initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}} transition={{delay:.2,duration:.8}}>
          <div className="device laptop">
            <div className="device-top"><span/><span/><span/></div>
            <div className="mock-ui">
              <div className="mock-sidebar">
                <b>Hyper</b><i/><i/><i/><i/>
              </div>
              <div className="mock-main">
                <div className="mini-head"><span>Dashboard</span><small>Visão geral</small></div>
                <div className="kpis">
                  <div><small>Vendas</small><strong>R$ 28.540</strong><em>+18%</em></div>
                  <div><small>Clientes</small><strong>128</strong><em>+24%</em></div>
                  <div><small>Conversão</small><strong>32%</strong><em>+8%</em></div>
                </div>
                <div className="chart">
                  <svg viewBox="0 0 600 220" preserveAspectRatio="none">
                    <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="white" stopOpacity=".28"/><stop offset="100%" stopColor="white" stopOpacity="0"/></linearGradient></defs>
                    <path className="area" d="M0,200 C70,180 80,160 130,170 C190,180 220,90 270,110 C330,130 350,60 410,82 C470,104 510,30 600,34 L600,220 L0,220Z"/>
                    <path className="line" d="M0,200 C70,180 80,160 130,170 C190,180 220,90 270,110 C330,130 350,60 410,82 C470,104 510,30 600,34"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="device phone">
            <div className="phone-notch"/>
            <div className="phone-card">
              <div className="phone-hero"/>
              <strong>Bruno Barbearia</strong>
              <small>Agende seu horário</small>
              <button>Escolher horário</button>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="marquee"><div>TECNOLOGIA • DESIGN • PERFORMANCE • RESULTADOS • TECNOLOGIA • DESIGN • PERFORMANCE • RESULTADOS •</div></div>

      <section className="stats section">
        {[[2,"+","Projetos desenvolvidos"],[100,"%","Responsivo"],[24,"/7","Presença digital"],[100,"%","Personalizado"]].map(([n,s,l])=>(
          <div className="stat" key={String(l)}><strong><Counter target={Number(n)} suffix={String(s)}/></strong><span>{String(l)}</span></div>
        ))}
      </section>

      <section className="section" id="servicos">
        <div className="section-head"><span className="eyebrow">Serviços</span><h2>Soluções digitais para transformar seu negócio.</h2><p>Do primeiro clique ao painel administrativo, cada detalhe é pensado para gerar percepção de valor e facilitar a operação da empresa.</p></div>
        <div className="cards">
          {services.map(({icon:Icon,title,text},i)=>(
            <motion.article className="service-card tilt" key={title} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.06}}>
              <div className="icon"><Icon/></div><h3>{title}</h3><p>{text}</p><span className="learn">Explorar <ArrowRight size={16}/></span>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section projects" id="projetos">
        <div className="section-head"><span className="eyebrow">Portfólio</span><h2>Projetos que transformam negócios.</h2></div>

        <motion.article className="project-card" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <div className="project-copy">
            <span className="tag">Site + Agendamento</span>
            <h3>Bruno Barbearia</h3>
            <p>Site completo desenvolvido para modernizar o atendimento e facilitar os agendamentos.</p>
            <div className="feature-grid">
              {["Agendamento on-line","Controle de horários","Painel do proprietário","Bloqueio de horários","WhatsApp","Responsivo"].map(x=><span key={x}><CheckCircle2 size={16}/>{x}</span>)}
            </div>
            <div className="project-actions">
              <a className="btn" href="https://barbearia-bruno-beta.vercel.app/" target="_blank" rel="noreferrer">Ver projeto <ArrowRight size={17}/></a>
              <a className="btn ghost" href="#contato">Detalhes</a>
            </div>
          </div>
          <div className="project-visual barber">
            <div className="browser"><div className="browser-top"><i/><i/><i/></div><div className="barber-site"><span>BRUNO</span><h4>BARBEARIA</h4><p>Estilo, precisão e tradição.</p><button>AGENDAR HORÁRIO</button></div></div>
          </div>
        </motion.article>

        <div className="project-divider"><span/></div>

        <motion.article className="project-card reverse" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <div className="project-copy">
            <span className="tag">Sistema empresarial</span>
            <h3>Padaria Santo Antônio</h3>
            <p>Sistema empresarial desenvolvido para facilitar a administração e organização da padaria.</p>
            <div className="feature-grid">
              {["Cadastro de clientes","Controle de fiados","Caderneta digital","Controle financeiro","Produtos","Relatórios"].map(x=><span key={x}><CheckCircle2 size={16}/>{x}</span>)}
            </div>
            <div className="project-actions"><a className="btn" href="#contato">Quero um sistema assim <ArrowRight size={17}/></a></div>
          </div>
          <div className="project-visual bakery">
            <div className="dashboard-demo">
              <div className="dash-top"><b>Santo Antônio</b><small>Painel Administrativo</small></div>
              <div className="dash-kpis"><span><small>Recebimentos</small><b>R$ 18.420</b></span><span><small>Fiados</small><b>R$ 3.250</b></span><span><small>Clientes</small><b>214</b></span></div>
              <div className="bar-chart">{[38,54,44,70,62,88,78,96].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div>
            </div>
          </div>
        </motion.article>
      </section>

      <section className="section about" id="sobre">
        <div>
          <span className="eyebrow">Sobre a Hyper Studio</span>
          <h2>Tecnologia desenvolvida para gerar resultados.</h2>
          <p>A Hyper Studio desenvolve soluções digitais personalizadas para empresas que querem modernizar processos, fortalecer sua presença digital e oferecer experiências melhores aos clientes.</p>
          <p>Cada projeto combina design, tecnologia, desempenho e facilidade de uso.</p>
        </div>
        <div className="network">
          <div className="node center">H</div>
          {["UI","UX","SEO","API","DB","WEB"].map((x,i)=><div className={`node n${i+1}`} key={x}>{x}</div>)}
          <svg viewBox="0 0 500 400"><line x1="250" y1="200" x2="80" y2="80"/><line x1="250" y1="200" x2="420" y2="80"/><line x1="250" y1="200" x2="450" y2="240"/><line x1="250" y1="200" x2="330" y2="350"/><line x1="250" y1="200" x2="150" y2="350"/><line x1="250" y1="200" x2="50" y2="240"/></svg>
        </div>
      </section>

      <section className="section" id="processo">
        <div className="section-head"><span className="eyebrow">Processo</span><h2>Da ideia ao projeto no ar.</h2></div>
        <div className="timeline">
          {process.map(([n,t,d],i)=>(
            <motion.div className="timeline-item" key={n} initial={{opacity:0,x:i%2?20:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
              <span>{n}</span><div><h3>{t}</h3><p>{d}</p></div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section dashboard-section">
        <div className="section-head"><span className="eyebrow">Dashboard demonstrativo</span><h2>Dados claros. Decisões melhores.</h2><p>Uma visão de como um sistema desenvolvido pela Hyper Studio pode organizar e apresentar informações importantes.</p></div>
        <div className="big-dashboard">
          <div className="dash-metrics">
            <div><span>Vendas</span><strong>R$ 28.540</strong><em>↑ 18%</em></div>
            <div><span>Novos clientes</span><strong>128</strong><em>↑ 24%</em></div>
            <div><span>Conversão</span><strong>32%</strong><em>↑ 8%</em></div>
          </div>
          <div className="main-chart">
            <div className="chart-head"><b>Performance</b><span>Últimos 30 dias</span></div>
            <svg viewBox="0 0 900 300" preserveAspectRatio="none">
              <defs><linearGradient id="bigArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fff" stopOpacity=".22"/><stop offset="100%" stopColor="#fff" stopOpacity="0"/></linearGradient></defs>
              <path className="area2" d="M0,245 C90,230 115,185 180,200 C240,214 300,120 365,145 C430,170 470,95 540,116 C625,142 665,58 725,82 C780,104 825,34 900,48 L900,300 L0,300Z"/>
              <path className="line2" d="M0,245 C90,230 115,185 180,200 C240,214 300,120 365,145 C430,170 470,95 540,116 C625,142 665,58 725,82 C780,104 825,34 900,48"/>
            </svg>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head"><span className="eyebrow">Diferenciais</span><h2>Por que escolher a Hyper Studio?</h2></div>
        <div className="diff-grid">
          {differentials.map(([Icon,title]:any)=><div className="diff" key={title}><Icon/><span>{title}</span></div>)}
        </div>
      </section>

      <section className="section before-after">
        <div className="section-head"><span className="eyebrow">Transformação digital</span><h2>Seu negócio antes e depois.</h2></div>
        <div className="compare">
          <div className="compare-side muted"><span>ANTES</span><h3>Processos manuais</h3>{["Atendimento manual","Pedidos pelo WhatsApp","Informações desorganizadas","Controle em papel","Dificuldade para vender online"].map(x=><p key={x}>{x}</p>)}</div>
          <div className="compare-center"><ArrowRight/></div>
          <div className="compare-side bright"><span>DEPOIS</span><h3>Operação digital</h3>{["Site profissional","Processos automatizados","Sistema organizado","Atendimento facilitado","Mais oportunidades de vendas"].map(x=><p key={x}><CheckCircle2 size={16}/>{x}</p>)}</div>
        </div>
      </section>

      <section className="cta section" id="contato">
        <motion.div initial={{opacity:0,scale:.96}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}>
          <span className="eyebrow">Vamos criar algo grande?</span>
          <h2>Seu próximo projeto começa aqui.</h2>
          <p>Transforme sua ideia em uma experiência digital profissional.</p>
          <div className="hero-actions">
            <a className="btn" href="mailto:contato@hyperstudio.com.br">SOLICITAR ORÇAMENTO <ArrowRight size={18}/></a>
            <a className="btn ghost" href="https://wa.me/5535984057883" target="_blank" rel="noreferrer"><MessageCircle size={18}/> FALAR NO WHATSAPP</a>
          </div>
        </motion.div>
      </section>

      <section className="section contact">
        <div className="contact-info">
          <span className="brand big"><span className="brand-mark">H</span><span>HYPER STUDIO</span></span>
          <h3>Transformamos ideias em experiências digitais.</h3>
          <p>🌐 hyperstudio.com.br</p>
          <p>📧 contato@hyperstudio.com.br</p>
          <p>📍 Soledade de Minas - MG</p>
          <p>Atendimento para todo o Brasil.</p>
        </div>
        <form className="contact-form" onSubmit={(e)=>e.preventDefault()}>
          <div className="form-row"><input placeholder="Nome"/><input placeholder="Empresa"/></div>
          <div className="form-row"><input placeholder="WhatsApp"/><input placeholder="E-mail" type="email"/></div>
          <select defaultValue=""><option value="" disabled>Tipo de projeto</option><option>Site</option><option>Sistema</option><option>Loja virtual</option><option>Landing page</option><option>Outro</option></select>
          <textarea placeholder="Conte um pouco sobre o projeto" rows={5}/>
          <button className="btn" type="submit">Solicitar orçamento <ArrowRight size={18}/></button>
        </form>
      </section>

      <footer>
        <span>© 2026 Hyper Studio. Todos os direitos reservados.</span>
        <div><a href="#inicio">Início</a><a href="#servicos">Serviços</a><a href="#projetos">Projetos</a><a href="#sobre">Sobre</a><a href="#contato">Contato</a></div>
      </footer>
    </main>
  );
}