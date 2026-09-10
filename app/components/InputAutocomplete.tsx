"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Option } from "@/app/components/InputSelect";

export type Props = {
  label: string;
  name: string;
  control: Control<any>;
  errors: Record<any, any>;
  options?: Option[];
  dark?: boolean;
  myClass?: string;
};

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

export default function InputAutocomplete(props: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    if (!props.options) return [];
    if (!query) return props.options;
    const q = normalize(query);
    return props.options.filter((item) => normalize(item.label).includes(q));
  }, [props.options, query]);

  return (
    <div className={"mb-2 " + props.myClass} ref={containerRef}>
      <label
        htmlFor={props.name}
        className={
          "block text-sm/6 font-medium text-gray-200 " +
          (!props.dark ? "label-secondary" : "")
        }
      >
        {props.label} {props.options ? "" : "(Cargando...)"}
      </label>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => {
          const selectedLabel = props.options?.find(
            (item) => item.value === field.value,
          )?.label;
          return (
            <div className="relative">
              <input
                id={props.name}
                autoComplete="off"
                style={{ fontSize: "14px", color: "black" }}
                className="block w-full rounded-md bg-white pl-3 pr-3 pt-2 pb-2 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-800"
                placeholder="Seleccione"
                value={open ? query : (selectedLabel ?? "")}
                onFocus={() => {
                  setQuery("");
                  setHighlighted(0);
                  setOpen(true);
                }}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlighted(0);
                  setOpen(true);
                  if (field.value) field.onChange("");
                }}
                onKeyDown={(e) => {
                  if (!open) return;
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setHighlighted((prev) =>
                      Math.min(prev + 1, filteredOptions.length - 1),
                    );
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setHighlighted((prev) => Math.max(prev - 1, 0));
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    const option = filteredOptions[highlighted];
                    if (option) {
                      field.onChange(option.value);
                      setQuery("");
                      setOpen(false);
                    }
                  } else if (e.key === "Escape") {
                    setOpen(false);
                  }
                }}
              />
              {open && (
                <ul className="absolute bottom-full left-0 z-10 mb-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 shadow-lg outline-1 outline-gray-300">
                  {filteredOptions.length === 0 && (
                    <li className="px-3 py-2 text-sm text-gray-400">
                      Sin resultados
                    </li>
                  )}
                  {filteredOptions.map((item, i) => (
                    <li
                      key={i}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        field.onChange(item.value);
                        setQuery("");
                        setOpen(false);
                      }}
                      className={
                        "cursor-pointer px-3 py-2 text-sm text-gray-900 " +
                        (i === highlighted ? "bg-cyan-50" : "") +
                        (item.value === field.value
                          ? " font-medium text-cyan-800"
                          : "")
                      }
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }}
      />
      <p className="input-error">{props.errors[props.name]?.message}</p>
    </div>
  );
}
