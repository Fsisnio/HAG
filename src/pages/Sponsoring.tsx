import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Check, Landmark, Mail, Phone, Sparkles, Wrench } from 'lucide-react';
import { CONTACT } from '../data/event';
import {
  BUDGET_TOTAL_LABEL,
  SPONSORING_INTRO,
  budgetLines,
  customPartnershipTypes,
  fundingSources,
  partnershipProcess,
  sponsorshipPacks,
  technicalPartnerExamples
} from '../data/sponsoring';

const packTone: Record<string, string> = {
  platinum: 'from-[#1a2744] to-blue-dark',
  diamant: 'from-slate-500 to-slate-700',
  or: 'from-gold to-yellow-600',
  argent: 'from-gray-300 to-gray-500',
  bronze: 'from-amber-700 to-orange-900'
};

const Sponsoring: React.FC = () => {
  const featured = sponsorshipPacks.find((pack) => pack.featured);
  const otherPacks = sponsorshipPacks.filter((pack) => !pack.featured);

  return (
    <div className="pt-20">
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <p className="text-gold font-semibold tracking-[0.18em] text-sm mb-3">HAG 2026</p>
          <h1 className="mb-6">
            Offres de <span className="text-gold">sponsoring</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Packs et avantages — associez votre marque à l’excellence de l’hospitalité guinéenne.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-5xl">
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-14">
            {SPONSORING_INTRO}
          </p>

          {featured && (
            <article className="bg-white rounded-3xl border border-gold/30 shadow-xl overflow-hidden mb-10">
              <div className={`bg-gradient-to-r ${packTone[featured.id]} px-8 py-8 text-white`}>
                <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-2">
                  Partenaire majeur
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{featured.name}</h2>
                <p className="text-2xl font-semibold text-gold">{featured.amountLabel}</p>
                {featured.tagline && <p className="mt-3 text-blue-100">{featured.tagline}</p>}
              </div>
              <div className="p-8">
                <p className="text-sm font-semibold text-blue-dark mb-4">Contreparties proposées</p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {featured.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherPacks.map((pack) => (
              <article
                key={pack.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
              >
                <div className={`bg-gradient-to-r ${packTone[pack.id]} px-6 py-5 text-white`}>
                  <h2 className="text-2xl font-bold">{pack.name}</h2>
                  <p className="text-xl font-semibold mt-1">{pack.amountLabel}</p>
                </div>
                <div className="p-6 flex-1">
                  <p className="text-sm font-semibold text-blue-dark mb-3">Contreparties proposées</p>
                  <ul className="space-y-2">
                    {pack.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <Wrench className="w-10 h-10 text-gold mb-4" />
              <h2 className="text-2xl font-bold text-blue-dark mb-2">Partenaire technique</h2>
              <p className="text-gold font-semibold mb-4">Contribution en nature ou financière</p>
              <p className="text-gray-700 mb-5">
                HAG 2026 accueille également les partenaires souhaitant contribuer directement à la
                réalisation de l’événement.
              </p>
              <p className="text-sm font-semibold text-blue-dark mb-3">Exemples</p>
              <ul className="grid grid-cols-2 gap-2 mb-5">
                {technicalPartnerExamples.map((item) => (
                  <li key={item} className="text-sm text-gray-700 flex items-start gap-2">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600">
                Les contreparties sont définies en fonction de la valeur et de la nature de la
                contribution.
              </p>
            </article>

            <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <Landmark className="w-10 h-10 text-gold mb-4" />
              <h2 className="text-2xl font-bold text-blue-dark mb-4">Partenaire institutionnel</h2>
              <p className="text-gray-700 mb-4">
                Le partenariat institutionnel peut prendre la forme d’un accompagnement
                institutionnel, technique, matériel ou financier.
              </p>
              <p className="text-gray-700">
                Les contreparties sont déterminées selon le statut du partenaire et la nature de son
                intervention.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-5xl">
          <h2 className="text-center mb-3">
            Modalités <span className="text-gold">pratiques</span>
          </h2>
          <p className="text-center text-gray-600 mb-12">Processus de partenariat</p>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {partnershipProcess.map((item) => (
              <li key={item.step} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-gold text-blue-dark font-bold mb-3">
                  {item.step}
                </span>
                <h3 className="font-bold text-blue-dark mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container max-w-5xl">
          <h2 className="text-center mb-4">
            Partenariats <span className="text-gold">personnalisés</span>
          </h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-8">
            HAG 2026 privilégie une approche flexible. Une entreprise peut choisir de devenir :
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {customPartnershipTypes.map((item) => (
              <li
                key={item}
                className="bg-white rounded-xl border border-gray-100 px-4 py-3 text-gray-800 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-gold shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="text-center mb-4">
            Budget <span className="text-gold">prévisionnel</span>
          </h2>
          <p className="text-center text-gray-700 mb-8">
            Le budget global prévisionnel de production de HAG 2026 est estimé à{' '}
            <strong>{BUDGET_TOTAL_LABEL}</strong>.
          </p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-blue-dark text-white">
                  <th className="px-5 py-3 font-semibold">Poste</th>
                  <th className="px-5 py-3 font-semibold text-right">Montant</th>
                </tr>
              </thead>
              <tbody>
                {budgetLines.map((line) => (
                  <tr key={line.label} className="border-t border-gray-100">
                    <td className="px-5 py-3 text-gray-800">{line.label}</td>
                    <td className="px-5 py-3 text-right font-medium text-blue-dark whitespace-nowrap">
                      {line.amount}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-gray-200 bg-gold/10">
                  <td className="px-5 py-4 font-bold text-blue-dark">Total prévisionnel</td>
                  <td className="px-5 py-4 text-right font-bold text-blue-dark whitespace-nowrap">
                    {BUDGET_TOTAL_LABEL}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container max-w-4xl">
          <h2 className="text-center mb-6">
            Modèle de <span className="text-gold">financement</span>
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            Le financement de HAG 2026 repose sur un modèle diversifié comprenant notamment :
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 mb-8">
            {fundingSources.map((item) => (
              <li key={item} className="flex items-start gap-2 text-gray-800">
                <Check className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
          <div className="bg-white rounded-2xl border border-gold/20 p-6 text-gray-700 space-y-3">
            <p>
              Le budget prévisionnel représente le coût global estimatif de réalisation de
              l’événement et ne constitue pas un montant demandé à un sponsor individuel.
            </p>
            <p>
              Les contributions des différents partenaires seront adaptées à leur formule de
              partenariat et aux contreparties convenues.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl text-center">
          <Award className="w-10 h-10 text-gold mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-blue-dark mb-4">Devenir partenaire HAG 2026</h2>
          <p className="text-gray-600 mb-8">
            Contactez l’équipe pour choisir une formule ou construire une offre sur mesure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <a
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Partenariat / sponsoring HAG 2026')}`}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-gold"
            >
              <Mail className="w-8 h-8 text-gold mx-auto mb-3" />
              <span className="text-blue-dark font-medium">{CONTACT.email}</span>
            </a>
            <a
              href={`tel:${CONTACT.phones[0].tel}`}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-gold"
            >
              <Phone className="w-8 h-8 text-gold mx-auto mb-3" />
              <span className="text-blue-dark font-medium">{CONTACT.phones[0].display}</span>
            </a>
          </div>
          <Link to="/contact" className="btn btn-primary btn-large inline-flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>Demander une proposition</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Sponsoring;
