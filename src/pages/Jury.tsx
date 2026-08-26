import React from 'react';
import { Link } from 'react-router-dom';
import { Gavel } from 'lucide-react';
import { juryMembers, JURY_STATUS } from '../data/jury';

const Jury: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <Gavel className="w-12 h-12 text-gold mx-auto mb-4" />
          <h1 className="mb-4">
            Le <span className="text-gold">jury</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Professionnels et personnalités chargés d’examiner les candidatures, de noter les nominés
            et de contribuer à la validation des résultats HAG 2026.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {juryMembers.length === 0 ? (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
              <p className="text-gray-700 leading-relaxed mb-6">{JURY_STATUS}</p>
              <p className="text-sm text-gray-500 mb-8">
                Chaque membre disposera d’une fiche : photo, nom et prénom, fonction, organisation,
                domaine d’expertise et courte biographie professionnelle.
              </p>
              <Link to="/reglement#jury" className="btn btn-secondary">
                Lire les règles du jury
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {juryMembers.map((member) => (
                <article key={member.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="aspect-[4/5] bg-blue-dark">
                    {member.photo ? (
                      <img src={member.photo} alt={`${member.firstName} ${member.lastName}`} className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <div className="p-5">
                    <h2 className="text-xl font-bold text-blue-dark">
                      {member.firstName} {member.lastName}
                    </h2>
                    <p className="text-gold font-medium mt-1">{member.role}</p>
                    <p className="text-sm text-gray-600 mt-1">{member.organization}</p>
                    <p className="text-xs uppercase tracking-wide text-blue-700 mt-3">{member.expertise}</p>
                    <p className="text-sm text-gray-700 mt-3 leading-relaxed">{member.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Jury;
