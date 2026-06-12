'use client';

import type { Project } from '@/lib/projects';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export function InfoPanel({ project, onClose }: Props) {
  return (
    <div className={`info-panel${project ? ' info-panel--visible' : ''}`}>
      {project && (
        <>
          <button className="info-panel__close" onClick={onClose} aria-label="Close">✕</button>
          <h2 className="info-panel__title">{project.title}</h2>
          <p className="info-panel__desc">{project.description}</p>
          <div className="info-panel__tags">
            {project.tags.map(t => (
              <span key={t} className="info-panel__tag">{t}</span>
            ))}
          </div>
          <a
            className="info-panel__link"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ borderColor: project.accentColor, color: project.accentColor }}
          >
            Live Demo →
          </a>
        </>
      )}
    </div>
  );
}
