const ApiService = {
    API_URL: "https://crud-usuarios-1zkp.onrender.com/api/users",

    async getAll() {
        const res = await fetch(this.API_URL);
        return await res.json();
    },

    async create(data) {
        return await fetch(this.API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    },

    async getById(id) {
        const res = await fetch(`${this.API_URL}/${id}`);
        if (!res.ok) throw new Error("User not found");
        return await res.json();
    },

    async update(id, data) {
        const res = await fetch(`${this.API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("User not found");
        return await res.json();
    },

    async delete(id) {
        const res = await fetch(`${this.API_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("User not found");
        return res;
    },

    async deleteAll() {
        return await fetch(this.API_URL, { method: "DELETE" });
    }
};

const TranslationService = {
    currentLang: 'es',
    translations: {
        es: {
            app_title: "CRUD Usuarios",
            desc_title: "Descripción",
            desc_text: "Este proyecto es una API REST moderna que permite administrar usuarios de forma eficiente. Diseñada con una arquitectura MVC limpia sobre Node.js.",
            ep_list: "→ Listar usuarios",
            ep_create: "→ Crear usuario",
            ep_update: "→ Actualizar usuario",
            ep_delete: "→ Eliminar usuario",
            cp_title: "Panel de Control",
            btn_create: "Crear",
            btn_search: "Buscar",
            btn_edit: "Editar",
            btn_delete: "Eliminar",
            btn_list_all: "Listar Todos",
            btn_delete_all: "Borrar Todo",
            form_new_user: "Nuevo Usuario",
            ph_name: "Nombre completo",
            ph_email: "correo@ejemplo.com",
            btn_save: "Guardar",
            form_search_user: "Buscar Usuario",
            ph_id: "ID del usuario",
            btn_search_action: "Buscar",
            form_update_user: "Actualizar Datos",
            ph_update_id: "ID a modificar",
            ph_new_name: "Nuevo Nombre",
            ph_new_email: "Nuevo Email",
            btn_update: "Actualizar",
            form_delete_user: "Eliminar Usuario",
            ph_delete_id: "ID a eliminar",
            btn_delete_action: "Eliminar",
            results_title: "Resultados",
            footer_credit: "💻 Creado por",
            no_users: "No hay usuarios registrados",
            alert_fields: "Completa todos los campos",
            alert_created: "Usuario creado",
            alert_error_created: "Error creando usuario.",
            alert_enter_id: "Ingresa un ID",
            alert_not_found: "Usuario no encontrado",
            alert_found: "Usuario encontrado:",
            alert_error_read: "Error leyendo usuario.",
            alert_enter_update_id: "Ingresa un ID para actualizar",
            alert_updated: "Usuario actualizado",
            alert_error_update: "Error actualizando usuario.",
            alert_enter_delete_id: "Ingresa un ID para eliminar",
            alert_confirm_delete: "¿Seguro que quieres eliminar este usuario?",
            alert_deleted: "Usuario eliminado",
            alert_error_delete: "Error eliminando usuario.",
            alert_confirm_delete_all: "¿Eliminar todos los usuarios?",
            alert_deleted_all: "Todos los usuarios eliminados",
            alert_error_delete_all: "Error eliminando usuarios.",
            alert_load_error: "Error cargando usuarios"
        },
        en: {
            app_title: "User CRUD",
            desc_title: "Description",
            desc_text: "This project is a modern REST API that allows efficient user management. Designed with a clean MVC architecture on Node.js.",
            ep_list: "→ List users",
            ep_create: "→ Create user",
            ep_update: "→ Update user",
            ep_delete: "→ Delete user",
            cp_title: "Control Panel",
            btn_create: "Create",
            btn_search: "Search",
            btn_edit: "Edit",
            btn_delete: "Delete",
            btn_list_all: "List All",
            btn_delete_all: "Delete All",
            form_new_user: "New User",
            ph_name: "Full Name",
            ph_email: "email@example.com",
            btn_save: "Save",
            form_search_user: "Search User",
            ph_id: "User ID",
            btn_search_action: "Search",
            form_update_user: "Update Data",
            ph_update_id: "ID to modify",
            ph_new_name: "New Name",
            ph_new_email: "New Email",
            btn_update: "Update",
            form_delete_user: "Delete User",
            ph_delete_id: "ID to delete",
            btn_delete_action: "Delete",
            results_title: "Results",
            footer_credit: "💻 Created by",
            no_users: "No users registered",
            alert_fields: "Complete all fields",
            alert_created: "User created",
            alert_error_created: "Error creating user.",
            alert_enter_id: "Enter an ID",
            alert_not_found: "User not found",
            alert_found: "User found:",
            alert_error_read: "Error reading user.",
            alert_enter_update_id: "Enter an ID to update",
            alert_updated: "User updated",
            alert_error_update: "Error updating user.",
            alert_enter_delete_id: "Enter an ID to delete",
            alert_confirm_delete: "Are you sure you want to delete this user?",
            alert_deleted: "User deleted",
            alert_error_delete: "Error deleting user.",
            alert_confirm_delete_all: "Delete all users?",
            alert_deleted_all: "All users deleted",
            alert_error_delete_all: "Error deleting users.",
            alert_load_error: "Error loading users"
        }
    },

    t(key) {
        return this.translations[this.currentLang][key] || key;
    },

    toggle() {
        this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
        this.updateInterface();
    },

    updateInterface() {
        const langLabel = document.getElementById('lang-label');
        if (langLabel) langLabel.textContent = this.currentLang === 'es' ? 'EN' : 'ES';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.t(key);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });

        // Update empty state message dynamically
        const list = document.getElementById("user-list");
        if (list && list.innerHTML.includes("text-muted")) {
            list.innerHTML = `<li class="list-group-item text-muted text-center py-4">${this.t('no_users')}</li>`;
        }
    }
};

const UIController = {
    init() {
        // Expose to window for HTML onclick handlers
        window.loadUsers = this.loadUsers.bind(this);
        window.createUser = this.createUser.bind(this);
        window.getUserById = this.getUserById.bind(this);
        window.updateUser = this.updateUser.bind(this);
        window.deleteUserById = this.deleteUserById.bind(this);
        window.deleteAllUsers = this.deleteAllUsers.bind(this);
        window.toggleForm = this.toggleForm.bind(this);
        window.toggleLanguage = () => TranslationService.toggle();

        lucide.createIcons();
    },

    toggleForm(formId) {
        document.querySelectorAll(".crud-form").forEach(form => {
            form.classList.add("hidden");
        });
        const form = document.getElementById(formId);
        if (form) {
            form.classList.remove("hidden");
        }
    },

    async loadUsers() {
        try {
            const users = await ApiService.getAll();
            const list = document.getElementById("user-list");
            list.innerHTML = "";

            if (users.length === 0) {
                list.innerHTML = `<li class="list-group-item text-muted text-center py-4">${TranslationService.t('no_users')}</li>`;
                return;
            }

            users.forEach(u => {
                const li = document.createElement("li");
                li.className = "list-group-item d-flex justify-content-between align-items-center";
                li.innerHTML = `
                    <div>
                        <span class="fw-bold text-dark">#${u.id}</span>
                        <span class="mx-2 text-primary">${u.name}</span>
                        <small class="text-muted text-truncate d-inline-block" style="max-width: 200px;">${u.email}</small>
                    </div>
                    <i data-lucide="user" class="text-black-50" size="16"></i>
                `;
                list.appendChild(li);
            });
            lucide.createIcons();
        } catch (err) {
            console.error(err);
            alert(TranslationService.t('alert_load_error'));
        }
    },

    async createUser() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        if (!name || !email) return alert(TranslationService.t('alert_fields'));

        try {
            await ApiService.create({ name, email });
            alert(TranslationService.t('alert_created'));
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            this.loadUsers();
        } catch (err) {
            console.error(err);
            alert(TranslationService.t('alert_error_created'));
        }
    },

    async getUserById() {
        const id = document.getElementById("readId").value;
        if (!id) return alert(TranslationService.t('alert_enter_id'));

        try {
            const user = await ApiService.getById(id);
            alert(`${TranslationService.t('alert_found')}\nID: ${user.id}\nNombre: ${user.name}\nEmail: ${user.email}`);
        } catch (err) {
            console.error(err);
            if (err.message.includes("Custom")) return alert(TranslationService.t('alert_not_found'));
            alert(TranslationService.t('alert_error_read'));
        }
    },

    async updateUser() {
        const id = document.getElementById("updateId").value;
        const name = document.getElementById("updateName").value;
        const email = document.getElementById("updateEmail").value;
        if (!id) return alert(TranslationService.t('alert_enter_update_id'));

        try {
            await ApiService.update(id, { name, email });
            alert(TranslationService.t('alert_updated'));
            this.loadUsers();
        } catch (err) {
            console.error(err);
            alert(TranslationService.t('alert_error_update'));
        }
    },

    async deleteUserById() {
        const id = document.getElementById("deleteId").value;
        if (!id) return alert(TranslationService.t('alert_enter_delete_id'));
        if (!confirm(TranslationService.t('alert_confirm_delete'))) return;

        try {
            await ApiService.delete(id);
            alert(TranslationService.t('alert_deleted'));
            this.loadUsers();
        } catch (err) {
            console.error(err);
            alert(TranslationService.t('alert_error_delete'));
        }
    },

    async deleteAllUsers() {
        if (!confirm(TranslationService.t('alert_confirm_delete_all'))) return;
        try {
            await ApiService.deleteAll();
            alert(TranslationService.t('alert_deleted_all'));
            this.loadUsers();
        } catch (err) {
            console.error(err);
            alert(TranslationService.t('alert_error_delete_all'));
        }
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    UIController.init();
});
