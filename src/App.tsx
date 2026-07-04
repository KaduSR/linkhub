import React, { useState } from "react"
import "./styles.css"

export default function App() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [clicks, setClicks] = useState(0)
  const [history, setHistory] = useState<{ original: string; short: string; date: string }[]>([])
  const [copied, setCopied] = useState(false)
  const [tab, setTab] = useState<"shorten" | "history">("shorten")

  const shorten = () => {
    if (!url.trim()) return
    const id = Math.random().toString(36).substr(2, 6)
    const short = `kaduc.link/${id}`
    setShortUrl(short)
    setHistory(prev => [{ original: url, short, date: new Date().toLocaleDateString("pt-BR") }, ...prev].slice(0, 20))
    setUrl("")
    setClicks(prev => prev + 1)
  }

  const copyToClipboard = async () => {
    try { await navigator.clipboard.writeText(shortUrl); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch {}
  }

  return React.createElement("div", { className: "app" },
    React.createElement("header", { className: "header" },
      React.createElement("div", { className: "container header-inner" },
        React.createElement("h1", null, "🔗 LinkHub"),
        React.createElement("span", { className: "clicks-badge" }, React.createElement("i", { className: "fa-solid fa-chart-simple" }), ` ${clicks} cliques`)
      )
    ),
    React.createElement("main", { className: "container" },
      React.createElement("div", { className: "hero-box" },
        React.createElement("h2", null, "Cole seu link longo"),
        React.createElement("p", null, "Encurte links e compartilhe com QR code."),
        React.createElement("div", { className: "input-group" },
          React.createElement("input", { placeholder: "https://seu-link-muito-longo.com/exemplo", value: url, onChange: (e: any) => setUrl(e.target.value), onKeyDown: (e: any) => e.key === "Enter" && shorten() }),
          React.createElement("button", { className: "btn", onClick: shorten }, "Encurtar")
        ),
        shortUrl && React.createElement("div", { className: "result-box" },
          React.createElement("span", { className: "short-url" }, shortUrl),
          React.createElement("button", { className: "copy-btn", onClick: copyToClipboard },
            copied ? React.createElement(React.Fragment, null, React.createElement("i", { className: "fa-solid fa-check" }), " Copiado!") : React.createElement(React.Fragment, null, React.createElement("i", { className: "fa-solid fa-copy" }), " Copiar")
          ),
          React.createElement("div", { className: "qr-box" },
            React.createElement("div", { className: "qr-placeholder" },
              React.createElement("i", { className: "fa-solid fa-qrcode" }),
              React.createElement("span", null, "QR Code")
            )
          )
        )
      ),
      React.createElement("div", { className: "tabs" },
        React.createElement("button", { className: `tab ${tab === "shorten" ? "active" : ""}`, onClick: () => setTab("shorten") }, "Criar Link"),
        React.createElement("button", { className: `tab ${tab === "history" ? "active" : ""}`, onClick: () => setTab("history") }, "Histórico")
      ),
      tab === "history" && React.createElement("div", { className: "history-list" },
        history.length === 0 ? React.createElement("p", { className: "empty" }, "Nenhum link encurtado ainda.") :
        history.map((h, i) => React.createElement("div", { key: i, className: "history-item" },
          React.createElement("div", { className: "history-info" },
            React.createElement("span", { className: "history-short" }, h.short),
            React.createElement("span", { className: "history-original" }, h.original),
            React.createElement("span", { className: "history-date" }, h.date)
          )
        ))
      )
    )
  )
}
