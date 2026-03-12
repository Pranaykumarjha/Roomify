import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import type { Route } from "./+types/home";
import { Button } from "../components/ui/Button";
import { Layers } from "lucide-react";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <div className="home">
    <Navbar />
    <section className="hero">
      <div className="announce">
        <div className="dot">
          <div className="pulse"> </div>
        </div>
        <p>Introducing Roomify 2.0</p>
      </div>
      <h1>Build beautiful arhcitectural designs with Roomify</h1>
      <p className="subtitle">
        Roomify is an AI first design environment that helps you visualise,build,design and render architectural projects faster than ever .
      </p>
      <div className="actions">
        <a href="#upload" className="cta">
          Start building <ArrowRight className="icon" />
        </a>
        <Button variant='outline' size='lg' className="demo">
          Watch Demo
        </Button>
      </div>
      <div id="upload" className="upload-shell">
        <div className="grid-overlay" />
        <div className="upload-card">
          <div className="upload-head">
            <div className="upload-icon">
              <Layers className="icon" />
            </div>
            <h3>Upload your floor plan</h3>
            <p>Supports JPEG,PNG formats up to 10mb</p>
          </div>
          <p>Upload Images</p>
        </div>
      </div>
    </section>
    <section className="projects">
      <div className="section-inner">
        <div className="section-head">
          <div className="copy">
            <h2>Projects</h2>
            <p>Your latest work and community projects all in one place</p>
          </div>
        </div>
        <div className="projects-grid ">
          <div className="project-card group">
            <div className="preview">
              <img src="https://roomify-mlhuk267-dfwu1i.puter.site/projects/1770803585402/rendered.png" alt="Project" />
              <div className="badge">
                <span>Community</span>
              </div>
            </div>
            <div className="card-body">
              <div><h3>Project JSR</h3>
                <div className="meta">
                  <Clock size={12} />
                  <span>{new Date('2027-01-01').toLocaleDateString()}</span>
                  <span>By Pranay</span>
                </div>
              </div>
              <div className="arrow">
                <ArrowUpRight size={18}/>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  </div>
}
