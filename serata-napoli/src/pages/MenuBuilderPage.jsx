import React, { useState, useRef } from "react";
import {
    Plus, Trash2, UtensilsCrossed, GripVertical, ImageOff,
    ChevronDown, ChevronUp, Tag, DollarSign, FileText, Image,
    CheckCircle, AlertCircle, Eye, EyeOff, Pencil, X, FolderPlus,
} from "lucide-react";
import SectionCard from "../components/SectionCard";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const EMPTY_ITEM = { name: "", price: "", description: "", image: "", id: null };
const EMPTY_CATEGORY = { name: "", id: null, items: [] };

function uid() { return Date.now() + Math.random().toString(36).slice(2); }

// ─── Sub-components ───────────────────────────────────────────────────────────

function Field({ label, icon: Icon, error, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-wider">
                {Icon && <Icon size={12} />}
                {label}
            </label>
            {children}
            {error && (
                <p className="flex items-center gap-1 text-red-400 text-xs font-semibold">
                    <AlertCircle size={11} /> {error}
                </p>
            )}
        </div>
    );
}

function Input({ className = "", ...props }) {
    return (
        <input
            {...props}
            className={`w-full bg-white/5 border border-white/10 focus:border-orange-500/60 focus:bg-white/8
                rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 outline-none
                transition-all duration-200 ${className}`}
        />
    );
}

function Textarea({ className = "", ...props }) {
    return (
        <textarea
            {...props}
            className={`w-full bg-white/5 border border-white/10 focus:border-orange-500/60 focus:bg-white/8
                rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 outline-none
                transition-all duration-200 resize-none ${className}`}
        />
    );
}

// ─── Item Form ────────────────────────────────────────────────────────────────

function ItemForm({ onAdd, categoryName }) {
    const [form, setForm] = useState(EMPTY_ITEM);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const nameRef = useRef(null);

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Il nome è obbligatorio";
        return e;
    };

    const handleAdd = () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        onAdd({ ...form, id: uid() });
        setForm(EMPTY_ITEM);
        setErrors({});
        setSuccess(true);
        setTimeout(() => setSuccess(false), 1800);
        nameRef.current?.focus();
    };

    const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) handleAdd(); };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nome" icon={Tag} error={errors.name}>
                    <Input
                        ref={nameRef}
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="es. Negroni"
                    />
                </Field>
                <Field label="Prezzo" icon={DollarSign}>
                    <Input
                        value={form.price}
                        onChange={(e) => set("price", e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="es. €12"
                    />
                </Field>
            </div>

            <Field label="Descrizione" icon={FileText}>
                <Textarea
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Ingredienti, note allergeni…"
                    rows={2}
                />
            </Field>

            <Field label="URL immagine" icon={Image}>
                <div className="flex gap-2">
                    <Input
                        value={form.image}
                        onChange={(e) => set("image", e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="https://…"
                    />
                    {form.image && (
                        <div className="w-10 h-10 shrink-0 rounded-xl overflow-hidden border border-white/10">
                            <img src={form.image} alt="" className="w-full h-full object-cover"
                                onError={(e) => { e.target.style.display = "none"; }} />
                        </div>
                    )}
                </div>
            </Field>

            <button
                onClick={handleAdd}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm
                    transition-all duration-300 transform active:scale-[0.98]
                    ${success
                        ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                        : "bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white hover:shadow-lg hover:shadow-orange-500/30"
                    }`}
            >
                {success ? (
                    <><CheckCircle size={16} /> Aggiunto!</>
                ) : (
                    <><Plus size={16} /> Aggiungi {categoryName ? `a "${categoryName}"` : "prodotto"}</>
                )}
            </button>
        </div>
    );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ item, onDelete, onEdit }) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => {
        if (confirmDelete) { onDelete(item.id); return; }
        setConfirmDelete(true);
        setTimeout(() => setConfirmDelete(false), 2500);
    };

    return (
        <div className="group flex items-start gap-3 p-4 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-200">
            {/* Grip */}
            <GripVertical size={16} className="text-white/20 group-hover:text-white/40 mt-0.5 shrink-0 transition-colors" />

            {/* Image */}
            {item.image ? (
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                        onError={(e) => { e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-white/5"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg></div>'; }} />
                </div>
            ) : (
                <div className="w-12 h-12 rounded-xl border border-dashed border-white/10 flex items-center justify-center shrink-0">
                    <ImageOff size={14} className="text-white/20" />
                </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                    <p className="text-white font-bold text-sm leading-snug">{item.name}</p>
                    {item.price && (
                        <span className="text-orange-400 font-black text-sm tabular-nums">{item.price}</span>
                    )}
                </div>
                {item.description && (
                    <p className="text-white/40 text-xs mt-0.5 leading-relaxed line-clamp-2">{item.description}</p>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
                <button
                    onClick={() => onEdit(item)}
                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                    title="Modifica"
                >
                    <Pencil size={13} />
                </button>
                <button
                    onClick={handleDelete}
                    className={`p-1.5 rounded-lg transition-all ${confirmDelete
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "text-white/40 hover:text-red-400 hover:bg-red-500/10"
                        }`}
                    title={confirmDelete ? "Clicca ancora per confermare" : "Elimina"}
                >
                    <Trash2 size={13} />
                </button>
            </div>
        </div>
    );
}

// ─── Category Block ───────────────────────────────────────────────────────────

function CategoryBlock({ category, onAddItem, onDeleteItem, onEditItem, onDeleteCategory, onEditCategoryName, expanded, onToggle }) {
    const [editingName, setEditingName] = useState(false);
    const [nameVal, setNameVal] = useState(category.name);

    const saveNameEdit = () => {
        if (nameVal.trim()) onEditCategoryName(category.id, nameVal.trim());
        setEditingName(false);
    };

    return (
        <div className="rounded-2xl border border-white/10 overflow-hidden">
            {/* Category header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-white/5">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button onClick={onToggle} className="text-white/50 hover:text-white transition-colors">
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {editingName ? (
                        <input
                            autoFocus
                            value={nameVal}
                            onChange={(e) => setNameVal(e.target.value)}
                            onBlur={saveNameEdit}
                            onKeyDown={(e) => { if (e.key === "Enter") saveNameEdit(); if (e.key === "Escape") setEditingName(false); }}
                            className="bg-white/10 border border-orange-500/50 rounded-lg px-2 py-1 text-white text-sm font-bold outline-none flex-1"
                        />
                    ) : (
                        <span className="text-white font-bold text-sm flex-1 truncate">{category.name}</span>
                    )}
                    <span className="text-white/25 text-xs shrink-0">{category.items.length} voci</span>
                </div>

                <div className="flex items-center gap-1 ml-3 shrink-0">
                    <button
                        onClick={() => setEditingName(true)}
                        className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/10 transition-all"
                    >
                        <Pencil size={12} />
                    </button>
                    <button
                        onClick={() => onDeleteCategory(category.id)}
                        className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <Trash2 size={12} />
                    </button>
                </div>
            </div>

            {/* Items + form */}
            {expanded && (
                <div className="divide-y divide-white/5">
                    {category.items.length > 0 && (
                        <div className="p-3 space-y-2">
                            {category.items.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    item={item}
                                    onDelete={(id) => onDeleteItem(category.id, id)}
                                    onEdit={(item) => onEditItem(category.id, item)}
                                />
                            ))}
                        </div>
                    )}

                    <div className="p-4 bg-black/10">
                        <p className="text-white/25 text-xs font-bold uppercase tracking-wider mb-3">
                            Aggiungi voce
                        </p>
                        <ItemForm onAdd={(item) => onAddItem(category.id, item)} categoryName={category.name} />
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────

function EditModal({ item, onSave, onClose }) {
    const [form, setForm] = useState({ ...item });
    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
            <div
                className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-black text-white">Modifica voce</h3>
                    <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/50 hover:text-white transition-all">
                        <X size={16} />
                    </button>
                </div>

                <div className="space-y-4">
                    <Field label="Nome" icon={Tag}>
                        <Input value={form.name} onChange={(e) => set("name", e.target.value)} />
                    </Field>
                    <Field label="Prezzo" icon={DollarSign}>
                        <Input value={form.price} onChange={(e) => set("price", e.target.value)} />
                    </Field>
                    <Field label="Descrizione" icon={FileText}>
                        <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} />
                    </Field>
                    <Field label="URL immagine" icon={Image}>
                        <Input value={form.image} onChange={(e) => set("image", e.target.value)} />
                    </Field>
                </div>

                <div className="flex gap-3 mt-6">
                    <button onClick={onClose} className="flex-1 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-bold text-sm transition-all">
                        Annulla
                    </button>
                    <button
                        onClick={() => { onSave(form); onClose(); }}
                        className="flex-1 py-3 rounded-2xl bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-sm transition-all hover:shadow-lg hover:shadow-orange-500/30"
                    >
                        Salva modifiche
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Live Preview ─────────────────────────────────────────────────────────────

function MenuPreview({ categories, flatItems }) {
    const totalItems = categories.reduce((n, c) => n + c.items.length, 0) + flatItems.length;
    const hasContent = totalItems > 0;

    return (
        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-full">
            <div className="flex items-center gap-2 mb-5">
                <Eye size={16} className="text-orange-400" />
                <h3 className="text-sm font-black text-white/60 uppercase tracking-wider">Anteprima</h3>
                {hasContent && (
                    <span className="ml-auto text-xs text-white/25 font-semibold">{totalItems} voc{totalItems === 1 ? "e" : "i"}</span>
                )}
            </div>

            {!hasContent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                        <UtensilsCrossed size={28} className="text-orange-400/60" />
                    </div>
                    <p className="text-white/30 text-sm font-semibold">Il menu apparirà qui</p>
                    <p className="text-white/15 text-xs mt-1">Aggiungi prodotti o categorie</p>
                </div>
            ) : (
                <div className="space-y-5 max-h-150 overflow-y-auto pr-1 scrollbar-thin">
                    {/* Flat items */}
                    {flatItems.length > 0 && (
                        <div className="space-y-2">
                            {flatItems.map((item) => <PreviewItem key={item.id} item={item} />)}
                        </div>
                    )}

                    {/* Categorized */}
                    {categories.map((cat) => cat.items.length > 0 && (
                        <div key={cat.id}>
                            <div className="flex items-center gap-2 mb-2.5">
                                <p className="text-white/50 text-xs font-black uppercase tracking-widest">{cat.name}</p>
                                <div className="flex-1 h-px bg-white/5" />
                            </div>
                            <div className="space-y-2">
                                {cat.items.map((item) => <PreviewItem key={item.id} item={item} />)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function PreviewItem({ item }) {
    return (
        <div className="flex items-start gap-3 p-3 bg-black/20 rounded-xl border border-white/5">
            {item.image && (
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                        onError={(e) => { e.target.parentElement.style.display = "none"; }} />
                </div>
            )}
            <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-bold leading-snug">{item.name}</p>
                {item.description && (
                    <p className="text-white/35 text-xs mt-0.5 leading-relaxed line-clamp-2">{item.description}</p>
                )}
            </div>
            {item.price && (
                <span className="text-orange-400 font-black text-sm shrink-0 tabular-nums">{item.price}</span>
            )}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MenuBuilderPage() {
    const [categories, setCategories] = useState([]);
    const [flatItems, setFlatItems] = useState([]);
    const [editTarget, setEditTarget] = useState(null); // { categoryId, item }
    const [expandedCats, setExpandedCats] = useState({});
    const [addingCat, setAddingCat] = useState(false);
    const [newCatName, setNewCatName] = useState("");
    const [mode, setMode] = useState("flat"); // "flat" | "categorized"

    // ── Category ops ──────────────────────────────────────────────────────────

    const addCategory = () => {
        if (!newCatName.trim()) return;
        const id = uid();
        setCategories((prev) => [...prev, { name: newCatName.trim(), id, items: [] }]);
        setExpandedCats((prev) => ({ ...prev, [id]: true }));
        setNewCatName("");
        setAddingCat(false);
        setMode("categorized");
    };

    const deleteCategory = (catId) => {
        setCategories((prev) => prev.filter((c) => c.id !== catId));
    };

    const editCategoryName = (catId, name) => {
        setCategories((prev) => prev.map((c) => c.id === catId ? { ...c, name } : c));
    };

    const toggleCategory = (catId) => {
        setExpandedCats((prev) => ({ ...prev, [catId]: !prev[catId] }));
    };

    // ── Item ops ──────────────────────────────────────────────────────────────

    const addItemToCategory = (catId, item) => {
        setCategories((prev) => prev.map((c) =>
            c.id === catId ? { ...c, items: [...c.items, item] } : c
        ));
    };

    const deleteItemFromCategory = (catId, itemId) => {
        setCategories((prev) => prev.map((c) =>
            c.id === catId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c
        ));
    };

    const addFlatItem = (item) => setFlatItems((prev) => [...prev, item]);

    const deleteFlatItem = (id) => setFlatItems((prev) => prev.filter((i) => i.id !== id));

    const saveEdit = (updated) => {
        if (editTarget.categoryId) {
            setCategories((prev) => prev.map((c) =>
                c.id === editTarget.categoryId
                    ? { ...c, items: c.items.map((i) => i.id === updated.id ? updated : i) }
                    : c
            ));
        } else {
            setFlatItems((prev) => prev.map((i) => i.id === updated.id ? updated : i));
        }
    };

    const totalItems = flatItems.length + categories.reduce((n, c) => n + c.items.length, 0);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 py-10 px-4">
            {/* Edit modal */}
            {editTarget && (
                <EditModal
                    item={editTarget.item}
                    onSave={saveEdit}
                    onClose={() => setEditTarget(null)}
                />
            )}

            <div className="max-w-6xl mx-auto">
                {/* Page header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-orange-500/15 border border-orange-500/20">
                            <UtensilsCrossed size={20} className="text-orange-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white leading-none">Menu Builder</h1>
                            <p className="text-white/35 text-sm mt-0.5">Costruisci il menu del tuo locale</p>
                        </div>
                        {totalItems > 0 && (
                            <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
                                <span className="text-orange-400 font-black text-lg">{totalItems}</span>
                                <span className="text-orange-400/60 text-xs font-semibold">voci totali</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mode toggle */}
                <div className="flex items-center gap-2 mb-6 p-1 bg-white/5 border border-white/10 rounded-2xl w-fit">
                    {[
                        { key: "flat", label: "Lista semplice" },
                        { key: "categorized", label: "Con categorie" },
                    ].map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setMode(key)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${mode === key
                                ? "bg-linear-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/20"
                                : "text-white/40 hover:text-white/70"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

                    {/* ── Left: Builder ─────────────────────────────────── */}
                    <div className="space-y-4">

                        {mode === "flat" ? (
                            /* Flat mode */
                            <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                                <h2 className="text-lg font-black text-white mb-5 flex items-center gap-2">
                                    <Plus size={18} className="text-orange-400" />
                                    Aggiungi prodotto
                                </h2>
                                <ItemForm onAdd={addFlatItem} />

                                {/* Flat items list */}
                                {flatItems.length > 0 && (
                                    <div className="mt-6 space-y-2">
                                        <p className="text-white/30 text-xs font-black uppercase tracking-wider mb-3">
                                            Prodotti ({flatItems.length})
                                        </p>
                                        {flatItems.map((item) => (
                                            <ProductCard
                                                key={item.id}
                                                item={item}
                                                onDelete={deleteFlatItem}
                                                onEdit={(item) => setEditTarget({ categoryId: null, item })}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Categorized mode */
                            <>
                                {categories.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-12 text-center bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-dashed border-white/10 rounded-3xl">
                                        <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-3">
                                            <FolderPlus size={24} className="text-orange-400/70" />
                                        </div>
                                        <p className="text-white/40 font-semibold text-sm">Nessuna categoria</p>
                                        <p className="text-white/20 text-xs mt-1">Crea la prima per iniziare</p>
                                    </div>
                                )}

                                {categories.map((cat) => (
                                    <CategoryBlock
                                        key={cat.id}
                                        category={cat}
                                        expanded={expandedCats[cat.id] !== false}
                                        onToggle={() => toggleCategory(cat.id)}
                                        onAddItem={addItemToCategory}
                                        onDeleteItem={deleteItemFromCategory}
                                        onEditItem={(catId, item) => setEditTarget({ categoryId: catId, item })}
                                        onDeleteCategory={deleteCategory}
                                        onEditCategoryName={editCategoryName}
                                    />
                                ))}

                                {/* Add category */}
                                {addingCat ? (
                                    <div className="flex gap-2 p-4 bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-orange-500/30 rounded-2xl">
                                        <input
                                            autoFocus
                                            value={newCatName}
                                            onChange={(e) => setNewCatName(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === "Enter") addCategory(); if (e.key === "Escape") { setAddingCat(false); setNewCatName(""); } }}
                                            placeholder="Nome categoria (es. Cocktail)"
                                            className="flex-1 bg-white/5 border border-white/10 focus:border-orange-500/60 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 outline-none transition-all"
                                        />
                                        <button onClick={addCategory} className="px-4 py-2 bg-linear-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl text-sm hover:from-orange-600 hover:to-pink-600 transition-all">
                                            Crea
                                        </button>
                                        <button onClick={() => { setAddingCat(false); setNewCatName(""); }} className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white rounded-xl transition-all">
                                            <X size={15} />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setAddingCat(true)}
                                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-dashed border-white/15 hover:border-orange-500/40 bg-white/3 hover:bg-orange-500/5 text-white/40 hover:text-orange-400 font-semibold text-sm transition-all duration-300"
                                    >
                                        <FolderPlus size={16} />
                                        Nuova categoria
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    {/* ── Right: Live Preview ───────────────────────────── */}
                    <div className="lg:sticky lg:top-8">
                        <MenuPreview categories={categories} flatItems={flatItems} />
                    </div>
                </div>
            </div>
        </div>
    );
}