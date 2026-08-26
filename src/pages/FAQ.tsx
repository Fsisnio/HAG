import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '../data/faq';
import { Link } from 'react-router-dom';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-20">
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-4">
            Questions <span className="text-gold">fréquentes</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Les réponses essentielles pour candidater, voter et comprendre le processus HAG 2026.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="bg-white border border-gray-100 rounded-2xl shadow-sm">
                <button
                  type="button"
                  className="w-full flex items-center justify-between text-left px-5 py-4"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-blue-dark pr-4">{item.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gold flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 text-gray-700 leading-relaxed">{item.answer}</p>
                )}
              </div>
            );
          })}

          <p className="text-sm text-gray-500 pt-6">
            Pour le détail juridique, consultez le{' '}
            <Link to="/reglement" className="text-blue-700 underline">
              règlement officiel
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
