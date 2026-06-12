import { Plus } from "lucide-react";

/**
 * Grilă de tip acordeon pentru secțiunea „Răspunsuri rapide".
 * Fiecare card se poate deschide/închide, cu animație în stilul site-ului.
 *
 * @param {object} props
 * @param {Array<{ question: string, answer: string }>} props.items
 * @param {string} [props.gridClassName] - clase Tailwind pentru grilă (coloane/spațiere)
 * @returns {JSX.Element | null}
 */
export default function QuickAnswersGrid({
  items = [],
  gridClassName = "grid gap-3 md:grid-cols-2",
}) {
  if (!items.length) return null;

  return (
    <div className={gridClassName}>
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/40 transition-colors duration-300 hover:border-[#cdb360]/60 open:border-[#cdb360]/70 open:shadow-[#cdb360]/10"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-3 marker:content-none">
            <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
            <span className="mt-[1px] inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-[#817e32]/25 bg-white text-[#817e32] shadow-sm shadow-[#817e32]/10 transition-transform duration-300 ease-out group-open:rotate-[135deg]">
              <Plus size={14} strokeWidth={2.5} aria-hidden="true" />
            </span>
          </summary>
          <div className="qa-reveal overflow-hidden">
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
