sequenceDiagram
    participant U as Usuario
    participant B as Navegador
    participant S as Servidor

    U->>B: Escribe nota y hace click en "Save"
    B->>S: HTTP POST /new_note (form data: note)

    Note right of S: req.body.note contiene el texto

    S->>S: Crear objeto note: {content, date}
    S->>S: notes.push(note)

    S-->>B: 302 Redirect (Location: /notes)

    B->>S: HTTP GET /notes
    S-->>B: HTML

    B->>S: HTTP GET /main.css
    S-->>B: main.css

    B->>S: HTTP GET /main.js
    S-->>B: main.js

    B->>S: HTTP GET /data.json
    S-->>B: data.json (con la nota nueva)

    B-->>U: Muestra página actualizada con la nueva nota