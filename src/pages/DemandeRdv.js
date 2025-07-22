import React, { useState, useEffect } from "react";

export default function DemandeRdv() {
  const [medecins, setMedecins] = useState([]);
  const [formData, setFormData] = useState({
    users_id: "",
    name: "",
    firstname: "",
    tel: "",
    numsecu: "",
    date: "",
  });
  const [message, setMessage] = useState("");

  // Charger la liste des médecins au chargement
  useEffect(() => {
    fetch("/get_docs")
      .then((res) => res.json())
      .then((data) => setMedecins(data))
      .catch(() => setMessage("Erreur lors du chargement des médecins"));
  }, []);

  // Gestion des changements sur formulaire
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  }

  // Soumission du formulaire
  async function handleSubmit(e) {
    e.preventDefault();

    // Validation simple (tu peux compléter)
    if (
      !formData.users_id ||
      !formData.name ||
      !formData.firstname ||
      !formData.tel ||
      !formData.numsecu ||
      !formData.date
    ) {
      setMessage("Tous les champs sont requis");
      return;
    }

    // POST JSON vers backend
    try {
      const res = await fetch("/add_rdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setMessage("Rendez-vous ajouté avec succès ✅");
        // Optionnel : reset form ou redirection
      } else {
        const err = await res.json();
        setMessage(err.error || "Erreur lors de l'ajout");
      }
    } catch {
      setMessage("Erreur réseau");
    }
  }

  return (
    <div className="container">
      <h1>Prendre un rendez-vous</h1>

      {message && <p style={{ color: "red" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Choisissez votre médecin :
          <select
            name="users_id"
            value={formData.users_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Sélectionner --</option>
            {medecins.map((doc) => (
              <option key={doc.users_id} value={doc.users_id}>
                {doc.username} ({doc.speciality})
              </option>
            ))}
          </select>
        </label>

        <label>
          Nom :
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Prénom :
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Téléphone :
          <input
            type="tel"
            name="tel"
            maxLength={10}
            minLength={10}
            value={formData.tel}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Numéro de sécurité sociale :
          <input
            type="text"
            name="numsecu"
            maxLength={15}
            minLength={15}
            value={formData.numsecu}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date et heure du rendez-vous :
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}