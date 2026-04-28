document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('student-form');
    const submitBtn = document.getElementById('submit-btn');
    const toast = document.getElementById('toast');
    
    // Simuler des numéros d'étudiants existants pour le test d'unicité (Mock API)
    const existingStudentNumbers = ['2026001', '2026002', '12345'];

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Réinitialiser les erreurs
        clearErrors();
        
        let isValid = true;
        
        // 1. Validation Nom
        const lastName = document.getElementById('lastName');
        if (!lastName.value.trim()) {
            showError('lastName', 'Le nom est requis.');
            isValid = false;
        }

        // 2. Validation Prénom
        const firstName = document.getElementById('firstName');
        if (!firstName.value.trim()) {
            showError('firstName', 'Le prénom est requis.');
            isValid = false;
        }

        // 3. Validation Email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError('email', 'L\'email est requis.');
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            showError('email', 'Veuillez entrer une adresse email valide.');
            isValid = false;
        }

        // 4. Validation Numéro étudiant
        const studentNumber = document.getElementById('studentNumber');
        if (!studentNumber.value.trim()) {
            showError('studentNumber', 'Le numéro étudiant est requis.');
            isValid = false;
        }

        // 5. Validation Programme
        const program = document.getElementById('program');
        if (!program.value) {
            showError('program', 'Veuillez sélectionner un programme.');
            isValid = false;
        }

        if (!isValid) return;

        // Démarrer l'animation de chargement
        setLoading(true);

        // Simuler un appel API asynchrone (vérification unicité + soumission)
        try {
            await simulateApiCall(studentNumber.value.trim(), existingStudentNumbers);
            
            // Succès : Réinitialiser le formulaire et afficher le toast
            form.reset();
            showToast();
            
            // Ajouter à notre BD simulée pour éviter les doublons lors du prochain test
            existingStudentNumbers.push(studentNumber.value.trim());

        } catch (errorMsg) {
            // Erreur : Numéro étudiant déjà pris
            showError('studentNumber', errorMsg);
        } finally {
            // Arrêter l'animation de chargement
            setLoading(false);
        }
    });

    function showError(inputId, message) {
        const inputElement = document.getElementById(inputId);
        const errorElement = document.getElementById(`error-${inputId}`);
        
        inputElement.classList.add('invalid');
        errorElement.textContent = message;
        errorElement.classList.add('visible');
    }

    function clearErrors() {
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => input.classList.remove('invalid'));
        
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.textContent = '';
            msg.classList.remove('visible');
        });
    }

    function setLoading(isLoading) {
        if (isLoading) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            form.querySelectorAll('input, select').forEach(el => el.disabled = true);
        } else {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            form.querySelectorAll('input, select').forEach(el => el.disabled = false);
        }
    }

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    function simulateApiCall(studentNumber, db) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simuler une latence réseau (1.5 secondes)
                if (db.includes(studentNumber)) {
                    reject('Ce numéro étudiant est déjà utilisé en base de données.');
                } else {
                    resolve();
                }
            }, 1500);
        });
    }
});
