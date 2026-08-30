import React from 'react';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { LegalDocument as LegalDocumentType, legalDocuments } from '../data/legal';

interface LegalDocumentPageProps {
  document: LegalDocumentType;
}

const LegalDocumentPage: React.FC<LegalDocumentPageProps> = ({ document }) => {
  const others = legalDocuments.filter((item) => item.slug !== document.slug);

  return (
    <div className="pt-20">
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <Scale className="w-12 h-12 text-gold mx-auto mb-4" />
          <p className="text-gold font-semibold tracking-[0.2em] text-sm mb-3">{document.shortTitle}</p>
          <h1 className="mb-4">{document.title}</h1>
          <p className="text-blue-100 max-w-3xl mx-auto">
            Hospitality Awards Guinée · Mise à jour le {document.updatedAt}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-5xl">
          <div className="space-y-4 mb-12">
            {document.intro.map((paragraph) => (
              <p key={paragraph} className="text-gray-700 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <nav className="bg-gray-50 rounded-2xl p-6 mb-12 border border-gray-100">
            <p className="text-sm font-semibold text-blue-dark mb-3">Sommaire</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {document.sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm text-gray-700 hover:text-blue-700"
                >
                  {index + 1}. {section.title}
                </a>
              ))}
            </div>
          </nav>

          <div className="space-y-12">
            {document.sections.map((section, index) => (
              <article key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-2xl font-bold text-blue-dark mb-4">
                  {index + 1}. {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-gray-700 leading-relaxed mb-3">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-3">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.closing?.map((paragraph) => (
                  <p key={paragraph} className="text-gray-700 leading-relaxed mb-3">
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap gap-3">
            <Link to="/reglement" className="btn btn-secondary">
              Règlement officiel
            </Link>
            {others.map((item) => (
              <Link key={item.slug} to={item.path} className="btn btn-secondary">
                {item.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalDocumentPage;
