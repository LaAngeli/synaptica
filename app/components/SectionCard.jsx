/**
 * Chenar de secțiune reutilizabil — pattern-ul vizual standard al site-ului:
 * un card `rounded-3xl` cu bordură + umbră, așezat direct pe fundalul paginii
 * (ca secțiunile de pe home). Se folosește într-un wrapper `space-y-10`, câte
 * un SectionCard per bloc logic, astfel încât fiecare secțiune are chenarul ei.
 *
 * variant="default" — bloc de conținut (gradient deschis + orbs aurii difuze).
 * variant="plain"   — bloc mai simplu, fără orbs (ex. „Răspunsuri rapide" / AEO).
 *
 * @param {object} props
 * @param {"default"|"plain"} [props.variant]
 * @param {boolean} [props.orbs] — override pentru decorul difuz (implicit: doar la „default")
 * @param {string} [props.id] — pentru anchor-link (ex. scroll la un serviciu)
 * @param {string} [props.className] — clase extra pe chenar
 * @param {string} [props.contentClassName] — clase pe wrapper-ul de conținut (ex. „grid …")
 * @param {React.ElementType} [props.as] — tag HTML (implicit `section`)
 */
export default function SectionCard({
  as: Tag = "section",
  variant = "default",
  orbs,
  id,
  className = "",
  contentClassName = "",
  children,
}) {
  const showOrbs = orbs ?? variant === "default";

  const base =
    variant === "plain"
      ? "rounded-3xl border border-slate-200 bg-white/85 px-6 py-8 shadow-lg shadow-slate-200 sm:px-8"
      : "relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 px-6 py-12 shadow-2xl shadow-slate-200 sm:px-10 lg:px-12";

  return (
    <Tag id={id} className={`${base} ${className}`.trim()}>
      {showOrbs && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute right-[12%] top-[-12%] h-72 w-72 rounded-full bg-[#cdb360]/40 blur-3xl" />
          <div className="absolute left-[-6%] bottom-[-14%] h-64 w-64 rounded-full bg-[#9f8a3f]/20 blur-3xl" />
        </div>
      )}
      <div className={`${showOrbs ? "relative " : ""}${contentClassName}`.trim()}>
        {children}
      </div>
    </Tag>
  );
}
