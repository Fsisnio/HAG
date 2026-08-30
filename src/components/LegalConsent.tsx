import React from 'react';
import { Link } from 'react-router-dom';

export interface LegalConsents {
  acceptsPrivacy: boolean;
  acceptsRules: boolean;
  acceptsPaymentTerms: boolean;
  acceptsMarketing: boolean;
}

export const emptyLegalConsents = (): LegalConsents => ({
  acceptsPrivacy: false,
  acceptsRules: false,
  acceptsPaymentTerms: false,
  acceptsMarketing: false
});

export const hasRequiredLegalConsents = (consents: LegalConsents): boolean =>
  consents.acceptsPrivacy && consents.acceptsRules && consents.acceptsPaymentTerms;

export const REQUIRED_LEGAL_CONSENT_ERROR =
  'Cochez les trois cases obligatoires : confidentialité, règlement officiel, et conditions du vote et des paiements.';

interface LegalConsentProps {
  values: LegalConsents;
  onChange: (next: LegalConsents) => void;
  compact?: boolean;
  errors?: Partial<Record<keyof Omit<LegalConsents, 'acceptsMarketing'>, string>>;
}

const LegalConsent: React.FC<LegalConsentProps> = ({
  values,
  onChange,
  compact = false,
  errors
}) => {
  const linkClass = compact
    ? 'text-blue-700 underline font-medium'
    : 'text-blue-700 underline';

  const boxClass = compact
    ? 'space-y-2.5'
    : 'space-y-4';

  const labelClass = compact
    ? 'flex items-start gap-2.5 text-sm text-gray-700'
    : 'flex items-start space-x-3 text-sm text-gray-700';

  const checkboxClass = compact ? 'mt-0.5 shrink-0' : 'mt-1 shrink-0';

  return (
    <div className={boxClass}>
      <div className={compact ? 'space-y-2.5' : 'space-y-3'}>
        <label className={labelClass}>
          <input
            type="checkbox"
            checked={values.acceptsPrivacy}
            onChange={(e) => onChange({ ...values, acceptsPrivacy: e.target.checked })}
            className={checkboxClass}
            required
          />
          <span>
            J’ai lu et j’accepte la{' '}
            <Link to="/confidentialite" target="_blank" rel="noreferrer" className={linkClass}>
              Politique de confidentialité
            </Link>
            . *
          </span>
        </label>
        {errors?.acceptsPrivacy && (
          <p className="text-red-500 text-xs ml-6">{errors.acceptsPrivacy}</p>
        )}

        <label className={labelClass}>
          <input
            type="checkbox"
            checked={values.acceptsRules}
            onChange={(e) => onChange({ ...values, acceptsRules: e.target.checked })}
            className={checkboxClass}
            required
          />
          <span>
            J’accepte le{' '}
            <Link to="/reglement" target="_blank" rel="noreferrer" className={linkClass}>
              Règlement officiel des Hospitality Awards Guinée 2026
            </Link>
            . *
          </span>
        </label>
        {errors?.acceptsRules && (
          <p className="text-red-500 text-xs ml-6">{errors.acceptsRules}</p>
        )}

        <label className={labelClass}>
          <input
            type="checkbox"
            checked={values.acceptsPaymentTerms}
            onChange={(e) => onChange({ ...values, acceptsPaymentTerms: e.target.checked })}
            className={checkboxClass}
            required
          />
          <span>
            J’accepte les{' '}
            <Link to="/cgv" target="_blank" rel="noreferrer" className={linkClass}>
              Conditions du vote et des paiements
            </Link>
            . *
          </span>
        </label>
        {errors?.acceptsPaymentTerms && (
          <p className="text-red-500 text-xs ml-6">{errors.acceptsPaymentTerms}</p>
        )}
      </div>

      <div
        className={
          compact
            ? 'pt-2 mt-1 border-t border-gray-200'
            : 'pt-4 mt-2 border-t border-gray-200'
        }
      >
        <p className={compact ? 'text-xs text-gray-500 mb-2' : 'text-xs text-gray-500 mb-3'}>
          Facultatif — indépendant de l’inscription, du vote et du paiement.
        </p>
        <label className={labelClass}>
          <input
            type="checkbox"
            checked={values.acceptsMarketing}
            onChange={(e) => onChange({ ...values, acceptsMarketing: e.target.checked })}
            className={checkboxClass}
          />
          <span>Je souhaite recevoir les actualités et communications des Hospitality Awards Guinée.</span>
        </label>
      </div>
    </div>
  );
};

export default LegalConsent;
