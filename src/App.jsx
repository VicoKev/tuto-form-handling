import {useState} from "react";

function App() {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const styles = {
        container: {
            maxWidth: "450px",
            margin: "20px auto",
            padding: "20px",
            borderRadius: "8px",
            background: "#f8f9fa",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        },
        fieldGroup: {
            display: "flex",
            flexDirection: "column",
            marginBottom: "15px"
        },
        label: {
            fontWeight: "600",
            marginBottom: "6px"
        },
        input: {
            padding: "10px",
            fontSize: "15px",
            borderRadius: "4px",
            border: "1px solid #ccc"
        },
        inputError: {
            border: "1px solid #e63946",
            background: "#ffe5e5"
        },
        errorText: {
            color: "#e63946",
            fontSize: "14px",
            marginTop: "4px"
        },
        button: {
            padding: "12px 18px",
            fontSize: "16px",
            fontWeight: "600",
            borderRadius: "4px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer"
        }
    };

    const validateField = (name, value) => {
        let message = "";

        if (!value.trim()) {
            message = "Ce champ est obligatoire.";
        }

        if (name === "email" && value.trim()) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                message = "Email invalide.";
            }
        }

        if (name === "phone" && value.trim()) {
            if (!/^[0-9]{8,15}$/.test(value)) {
                message = "Numéro de téléphone invalide.";
            }
        }

        if (name === "password" && value.trim()) {
            const strongPassword =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=]).{8,}$/;

            if (!strongPassword.test(value)) {
                message =
                    "8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial requis.";
            }
        }

        if (name === "confirmPassword" && value.trim()) {
            if (value !== form.password) {
                message = "La confirmation ne correspond pas.";
            }
        }

        return message;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        setForm({...form, [name]: value});

        setErrors({
            ...errors,
            [name]: validateField(name, value)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation finale
        const newErrors = {};
        Object.keys(form).forEach((key) => {
            const errorMsg = validateField(key, form[key]);
            if (errorMsg) newErrors[key] = errorMsg;
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert("Bien joué !");
        }
    };

    const inputWithError = (field) =>
        errors[field]
            ? {...styles.input, ...styles.inputError}
            : styles.input;

    return (
        <form onSubmit={handleSubmit} style={styles.container}>
            {/* Prénom */}
            <div style={styles.fieldGroup}>
                <label style={styles.label}>Prénom</label>
                <input
                    style={inputWithError("firstname")}
                    type="text"
                    name="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                />
                {errors.firstname && (
                    <span style={styles.errorText}>{errors.firstname}</span>
                )}
            </div>

            {/* Nom */}
            <div style={styles.fieldGroup}>
                <label style={styles.label}>Nom de famille</label>
                <input
                    style={inputWithError("lastname")}
                    type="text"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                />
                {errors.lastname && (
                    <span style={styles.errorText}>{errors.lastname}</span>
                )}
            </div>

            {/* Email */}
            <div style={styles.fieldGroup}>
                <label style={styles.label}>Email</label>
                <input
                    style={inputWithError("email")}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
                {errors.email && (
                    <span style={styles.errorText}>{errors.email}</span>
                )}
            </div>

            {/* Téléphone */}
            <div style={styles.fieldGroup}>
                <label style={styles.label}>Téléphone</label>
                <input
                    style={inputWithError("phone")}
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                />
                {errors.phone && (
                    <span style={styles.errorText}>{errors.phone}</span>
                )}
            </div>

            {/* Mot de passe */}
            <div style={styles.fieldGroup}>
                <label style={styles.label}>Mot de passe</label>
                <input
                    style={inputWithError("password")}
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
                {errors.password && (
                    <span style={styles.errorText}>{errors.password}</span>
                )}
            </div>

            {/* Confirmation */}
            <div style={styles.fieldGroup}>
                <label style={styles.label}>Confirmation du mot de passe</label>
                <input
                    style={inputWithError("confirmPassword")}
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                />
                {errors.confirmPassword && (
                    <span style={styles.errorText}>{errors.confirmPassword}</span>
                )}
            </div>

            <button style={styles.button} type="submit">
                Envoyer
            </button>
        </form>
    );
}

export default App
