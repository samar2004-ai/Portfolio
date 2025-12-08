document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIQUE DE LA CARTE D'ÉVÉNEMENT (Corrigée) ---

    const eventCards = document.querySelectorAll('.event-card');

    eventCards.forEach(card => {
        const imageUrl = card.getAttribute('data-event-image');
        const visualElement = card.querySelector('.event-visual');
        const fallbackIcon = visualElement ? visualElement.querySelector('.fallback-icon') : null;

        // 1. Initialisation (Chargement de l'image de fond)
        if (imageUrl && visualElement) {
            visualElement.style.backgroundImage = `url('${imageUrl}')`;
            if (fallbackIcon) {
                fallbackIcon.style.opacity = '0';
            }
        }

        // 2. Gestion de l'événement de CLIC pour l'affichage de l'image
        card.addEventListener('click', () => {
            card.classList.toggle('is-active');
        });

        // 3. Gestion des effets visuels au survol 
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('is-active')) {
                card.style.transform = 'translateY(-5px) scale(1.01)';
                card.style.boxShadow = '0 10px 20px var(--color-shadow)'; 
            }
        });

        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('is-active')) {
                card.style.transform = 'none';
                card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.4)'; 
            }
        });
    });

    // ------------------------------------------------------------------
    // --- 1. Gestion du Mode Sombre (Dark Mode) 🌙 / Lumière (Light Mode) ☀️ ---
    // ------------------------------------------------------------------

    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');

    // Charge la préférence de thème
    const storedTheme = localStorage.getItem('theme') || 'light';
    if (storedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);

        // Changer l'icône
        themeToggle.innerHTML = currentTheme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });


    // ------------------------------------------------------------------
    // --- 2. Gestion de la Langue (Multilingue) - MISE À JOUR ---
    // ------------------------------------------------------------------

    const langToggle = document.getElementById('lang-toggle');
    
    // Objet de traduction COMPLET avec les nouvelles clés
    const translations = {
        'fr': {
            'page_title': 'Samar Ben Abderrahmen - Portfolio IoT',
            'profile_role': 'Étudiante en Internet des Objets (IoT)',
            'nav_about': 'À Propos',
            'nav_skills': 'Compétences',
            'nav_education': 'Formation',
            'nav_experience': 'Expérience & Projets',
            'nav_projects': 'Projets',
            'nav_certifications': 'Certifications',
            'nav_activities': 'Activités & Bénévolat',
            'nav_contact': 'Contact',
            'nav_events': 'Événements IT', // Nouvelle clé
            'section_about': 'À Propos',
            'summary_text': 'Étudiante motivée en **IoT**, passionnée par les systèmes connectés et la communication entre les objets intelligents. J’aime explorer comment les dispositifs interagissent, échangent des données et créent de la valeur dans des environnements intelligents. Curieuse et proactive, j’apprécie relever de nouveaux défis, collaborer en équipe et transformer des idées en projets fonctionnels, fiables et pertinents. Mon objectif est de concevoir des solutions innovantes qui allient créativité, technologie et impact réel.',
            'about_languages_title': 'Langues',
            'lang_french': '🇫🇷 Français',
            'lang_english': '🇬🇧 Anglais',
            'lang_arabic': '🇹🇳 Arabe (Langue maternelle)',
            'section_skills': 'Compétences',
            'skills_tech_title': 'Techniques',
            'skills_tech_lang': 'Langages: Python, Java, C/C++, **C#**, PHP, HTML, CSS',
            'skills_tech_frameworks': 'Frameworks: React, Laravel, Flutter',
            'skills_tech_db': 'Bases de Données: MySQL, MongoDB',
            'skills_tech_iot': 'Systèmes Embarqués: Arduino',
            'skills_tech_tools': 'Outils: Canva, CapCut, Adobe Premiere Pro',
            'skills_soft_title': 'Comportementales',
            'skills_soft_team': 'Travail en équipe',
            'skills_soft_leadership': 'Leadership',
            'skills_soft_art': 'Art oratoire',
            'section_education': 'Formation',
            'edu_licence_title': 'Licence en ingénieurie des systémes informatique (IoT)',
            'edu_licence_institution': 'Institut Supérieur d’Informatique et Technologies de communication',
            'edu_bac_title': 'Baccalauréat en Mathématiques',
            'edu_bac_institution': 'Lycée Farhat Hached, M\'saken',
            'section_experience': 'Expérience & Projets',
            'exp_stages_title': 'Stages',
            'exp_webdev_title': 'Stage Développement Web',
            'exp_webdev_company': 'STIP – Société Tunisienne des Industries de Pneumatiques, M\'saken',
            'exp_webdev_desc1': 'Développement de nouvelles fonctionnalités, tests et correction de bugs.',
            'exp_webdev_desc2': 'Contribution à l\'évolution et à la maintenance d\'une application web.',
            'exp_itintern_title': 'Stagiaire Informatique',
            'exp_itintern_company': 'Future vision, Messadine',
            'exp_itintern_desc1': 'Obtention de la certification **C#** (Microsoft Learn).',
            'exp_itintern_desc2': 'Réalisation des mini projets pratiques.',
            'exp_pro_title': 'Expérience Professionnelle (Divers)',
            'exp_sales_title': 'Vendeuse & Caissière',
            'exp_sales_company': 'Épices Nabli / Supérette Baccouch',
            'exp_sales_desc1': 'Accueil et conseil des clients, gestion de la caisse.',
            'exp_sales_desc2': 'Suivi du stock et mise en rayon des articles.',
            'exp_worker_title': 'Ouvrière',
            'exp_worker_company': 'Usine Golden Confort',
            'exp_worker_desc1': 'Réalisation de câblages électriques pour équipements électroniques.',
            'section_projects': 'Projets Techniques & Personnels', // Titre pour la sous-section projets
            'projects_it_title': 'Projets Informatiques & IoT', // Nouveau titre
            'proj_tracker_title': 'Focus Tracker (Mobile & Backend)',
            'proj_tracker_desc': 'Développement d\'une application mobile de suivi de la concentration avec analyse des performances en temps réel.',
            'proj_bookmood_title': 'Book Mood (Système de Recommandation)',
            'proj_bookmood_desc': 'Implémentation d\'un système de recommandation de livres basé sur l\'état d\'esprit (mood) de l\'utilisateur.',
            'proj_form_title': 'Formulaire Augmenté (Web)',
            'proj_form_desc': 'Conception d\'un formulaire interactif et dynamique utilisant des technologies frontend modernes.',
            'proj_link_github': 'Lien GitHub',
            'proj_link_github_bookmood': 'Lien GitHub',
            'proj_link_github_form': 'Lien GitHub',
            'projects_personal_title': 'Projet Personnel (Entrepreneuriat)', // Nouveau titre
            'proj_jewelry_title': 'S&N Jewelry',
            'proj_jewelry_desc': 'Fondatrice d\'une marque de bijoux. Ce projet a développé mes compétences en gestion de projet, marketing, vente en ligne et entrepreneuriat.',
            'proj_jewelry_period': 'Période: 16-07-2024 - Présent',
            'proj_link_instagram': 'Page Instagram',
            'section_certifications': 'Certifications',
            'cert_hint_flip': 'Cliquez pour voir l\'image',
            'cert_hint_back': 'Cliquez pour revenir',
            'cert_csharp_title': 'C# (Microsoft Learn)',
            'cert_csharp_desc': 'Obtenue lors du stage Stagiaire Informatique.',
            'cert_cyber_title': 'Introduction à la Cybersécurité', // Nouvelle clé
            'cert_cyber_desc': 'Cisco Networking Academy', // Nouvelle clé
            'cert_nvidia_title': 'Data Parallelism (Deep Learning)', // Nouvelle clé
            'cert_nvidia_desc': 'NVIDIA - Formation sur les Multiples GPU', // Nouvelle clé
            'cert_network_title': 'Networking Basics', // Nouvelle clé
            'cert_network_desc': 'Cisco Networking Academy', // Nouvelle clé
            'section_events': 'Événements Techniques', // Nouvelle clé
            'event_hackathon_title': 'Hackathon ISSAT Sousse', // Nouvelle clé
            'event_hackathon_desc': 'Participation à une compétition de développement intensif à l\'Institut Supérieur des Sciences Appliquées et de Technologie de Sousse.', // Nouvelle clé
            'event_ctf_title': 'CTF ISITCOM (Capture The Flag)', // Nouvelle clé
            'event_ctf_desc': 'Compétition de sécurité offensive/défensive à l\'Institut Supérieur d\'Informatique et des Technologies de la Communication.', // Nouvelle clé
            'event_nuitinfo_title': 'Nuit d\'Info (Concours de Programmation)', // Nouvelle clé
            'event_nuitinfo_desc': 'Participation à un concours de programmation et de développement nocturne.', // Nouvelle clé
            'section_activities': 'Activités & Expérience Bénévole',
            'vol_jci_title': 'Membre comité media - Jeune Chambre Internationale (JCI)',
            'vol_jci_desc1': 'Responsable du montage vidéo et du contenu multimédia.',
            'vol_jci_desc2': 'Planification, organisation et coordination d\'événements.',
            'vol_cr_title': 'Membre - Croissant-Rouge M’saken',
            'vol_cr_desc1': 'Formation aux premiers secours.',
            'vol_cr_desc2': 'Participation à des actions humanitaires.',
            'section_contact': 'Contact',
            'contact_phone_label': '**Téléphone**',
            'contact_email_label': '**Email**',
            'contact_location_label': '**Localisation**',
            'footer_copyright': '&copy; 2025 Samar Ben Abderrahmen. Réalisé pour un portfolio professionnel.'
        },
        'en': {
            'page_title': 'Samar Ben Abderrahmen - IoT Portfolio',
            'profile_role': 'Internet of Things (IoT) Student',
            'nav_about': 'About',
            'nav_skills': 'Skills',
            'nav_education': 'Education',
            'nav_experience': 'Experience & Projects',
            'nav_projects': 'Projects',
            'nav_certifications': 'Certifications',
            'nav_activities': 'Activities & Volunteering',
            'nav_contact': 'Contact',
            'nav_events': 'IT Events',
            'section_about': 'About Me',
            'summary_text': 'Motivated **IoT** student, passionate about connected systems and communication between intelligent objects. I enjoy exploring how devices interact, exchange data, and create value in smart environments. Curious and proactive, I appreciate taking on new challenges, collaborating in a team, and transforming ideas into functional, reliable, and relevant projects. My goal is to design innovative solutions that combine creativity, technology, and real impact.',
            'about_languages_title': 'Languages',
            'lang_french': '🇫🇷 French',
            'lang_english': '🇬🇧 English',
            'lang_arabic': '🇹🇳 Arabic (Native)',
            'section_skills': 'Skills',
            'skills_tech_title': 'Technical Skills',
            'skills_tech_lang': 'Languages: Python, Java, C/C++, **C#**, PHP, HTML, CSS',
            'skills_tech_frameworks': 'Frameworks: React, Laravel, Flutter',
            'skills_tech_db': 'Databases: MySQL, MongoDB',
            'skills_tech_iot': 'Embedded Systems: Arduino',
            'skills_tech_tools': 'Tools: Canva, CapCut, Adobe Premiere Pro',
            'skills_soft_title': 'Soft Skills',
            'skills_soft_team': 'Teamwork',
            'skills_soft_leadership': 'Leadership',
            'skills_soft_art': 'Public Speaking',
            'section_education': 'Education',
            'edu_licence_title': 'Bachelor\'s Degree in Computer Systems Engineering (IoT)',
            'edu_licence_institution': 'Higher Institute of Computer Science and Communication Technologies',
            'edu_bac_title': 'Baccalaureate in Mathematics',
            'edu_bac_institution': 'Farhat Hached High School, M\'saken',
            'section_experience': 'Experience & Projects',
            'exp_stages_title': 'Internships',
            'exp_webdev_title': 'Web Development Internship',
            'exp_webdev_company': 'STIP – Tunisian Tire Industries Company, M\'saken',
            'exp_webdev_desc1': 'Development of new features, testing, and bug fixing.',
            'exp_webdev_desc2': 'Contribution to the evolution and maintenance of a web application.',
            'exp_itintern_title': 'IT Intern',
            'exp_itintern_company': 'Future vision, Messadine',
            'exp_itintern_desc1': 'Obtained **C#** certification (Microsoft Learn).',
            'exp_itintern_desc2': 'Execution of practical mini-projects.',
            'exp_pro_title': 'Professional Experience (Various)',
            'exp_sales_title': 'Saleswoman & Cashier',
            'exp_sales_company': 'Epices Nabli / Supérette Baccouch',
            'exp_sales_desc1': 'Customer reception and advice, cash register management.',
            'exp_sales_desc2': 'Inventory tracking and shelf stocking.',
            'exp_worker_title': 'Worker',
            'exp_worker_company': 'Golden Confort Factory',
            'exp_worker_desc1': 'Execution of electrical wiring for electronic equipment.',
            'section_projects': 'Technical & Personal Projects',
            'projects_it_title': 'IT & IoT Projects',
            'proj_tracker_title': 'Focus Tracker (Mobile & Backend)',
            'proj_tracker_desc': 'Development of a mobile application for concentration tracking with real-time performance analysis.',
            'proj_bookmood_title': 'Book Mood (Recommendation System)',
            'proj_bookmood_desc': 'Implementation of a book recommendation system based on user mood.',
            'proj_form_title': 'Augmented Form (Web)',
            'proj_form_desc': 'Design of an interactive and dynamic form using modern frontend technologies.',
            'proj_link_github': 'GitHub Link',
            'proj_link_github_bookmood': 'GitHub Link',
            'proj_link_github_form': 'GitHub Link',
            'projects_personal_title': 'Personal Project (Entrepreneurship)',
            'proj_jewelry_title': 'S&N Jewelry',
            'proj_jewelry_desc': 'Founder of a jewelry brand. This small business allowed me to develop skills in project management, marketing, and entrepreneurship.',
            'proj_jewelry_period': 'Period: 16-07-2024 - Present',
            'proj_link_instagram': 'Instagram Page',
            'section_certifications': 'Certifications',
            'cert_hint_flip': 'Click to view image',
            'cert_hint_back': 'Click to flip back',
            'cert_csharp_title': 'C# (Microsoft Learn)',
            'cert_csharp_desc': 'Obtained during the IT Intern stage.',
            'cert_cyber_title': 'Introduction to Cybersecurity',
            'cert_cyber_desc': 'Cisco Networking Academy',
            'cert_nvidia_title': 'Data Parallelism (Deep Learning)',
            'cert_nvidia_desc': 'NVIDIA - Multiple GPU Training',
            'cert_network_title': 'Networking Basics',
            'cert_network_desc': 'Cisco Networking Academy',
            'section_events': 'IT Events',
            'event_hackathon_title': 'ISSAT Sousse Hackathon',
            'event_hackathon_desc': 'Participation in an intensive development competition at the Higher Institute of Applied Sciences and Technology of Sousse.',
            'event_ctf_title': 'CTF ISITCOM (Capture The Flag)',
            'event_ctf_desc': 'Offensive/defensive security competition at the Higher Institute of Computer Science and Communication Technologies.',
            'event_nuitinfo_title': 'Nuit d\'Info (Programming Contest)',
            'event_nuitinfo_desc': 'Participation in a night-long programming and development contest.',
            'section_activities': 'Activities & Volunteer Experience',
            'vol_jci_title': 'Media Committee Member - Junior Chamber International (JCI)',
            'vol_jci_desc1': 'Responsible for video editing and multimedia content.',
            'vol_jci_desc2': 'Planning, organizing, and coordinating events.',
            'vol_cr_title': 'Member - Red Crescent M’saken',
            'vol_cr_desc1': 'First aid training.',
            'vol_cr_desc2': 'Participation in humanitarian actions.',
            'section_contact': 'Contact',
            'contact_phone_label': '**Phone**',
            'contact_email_label': '**Email**',
            'contact_location_label': '**Location**',
            'footer_copyright': '&copy; 2025 Samar Ben Abderrahmen. Built for a professional portfolio.'
        }
    };

    const setLanguage = (lang) => {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                // Utiliser innerHTML pour conserver la mise en forme (comme **IoT**)
                element.innerHTML = translations[lang][key]; 
            }
        });
        localStorage.setItem('lang', lang);
        langToggle.textContent = lang === 'fr' ? 'Fr / En' : 'En / Fr';
        document.documentElement.lang = lang; 
    };

    // Charger la langue préférée
    let currentLang = localStorage.getItem('lang') || 'fr';
    setLanguage(currentLang);

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        setLanguage(currentLang);
    });

    // ------------------------------------------------------------------
    // --- 3. Logique du Menu Hamburger ---
    // ------------------------------------------------------------------

    const menuToggleBtn = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const headerRight = document.querySelector('.header-right');
    const header = document.getElementById('header');

    menuToggleBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        const icon = menuToggleBtn.querySelector('i');
        
        if (mainNav.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // Icône de fermeture
            
            // Déplacer les toggles et social links dans le menu mobile
            headerRight.style.display = 'flex';
            mainNav.appendChild(headerRight);

        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');

            // Remettre les toggles et social links dans le header
            header.appendChild(headerRight); 
            // Cacher la div 'header-right' sur mobile quand le menu est fermé
            headerRight.style.display = 'none'; 
        }
    });

    // Fermer le menu après un clic sur un lien (sur mobile)
    document.querySelectorAll('#main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            // Vérifier si nous sommes sur un écran mobile
            if (window.innerWidth <= 900) {
                mainNav.classList.remove('open');
                menuToggleBtn.querySelector('i').classList.remove('fa-times');
                menuToggleBtn.querySelector('i').classList.add('fa-bars');

                // Remettre les toggles en place
                header.appendChild(headerRight); 
                headerRight.style.display = 'none'; 
            }
        });
    });


    // ------------------------------------------------------------------
    // --- 4. Gestion de l'effet de Carte Flip (Certifications) [CORRIGÉ] ---
    // ------------------------------------------------------------------

    const flipContainers = document.querySelectorAll('.flip-container');

    flipContainers.forEach(container => {
        
        // Logique de retournement au CLIC
        container.addEventListener('click', () => {
            container.classList.toggle('flipped');
        });

        // Gestion de l'effet de levage 3D au survol (utilise les styles en ligne)
        container.addEventListener('mouseenter', () => {
             if (!container.classList.contains('flipped')) {
                 container.style.transform = 'translateY(-5px) scale(1.01)';
                 container.style.boxShadow = '0 20px 40px -15px var(--color-shadow)'; 
             }
        });

        container.addEventListener('mouseleave', () => {
            if (!container.classList.contains('flipped')) {
                container.style.transform = 'none';
                container.style.boxShadow = '0 10px 30px -10px var(--color-shadow)'; // Ombre par défaut
            }
        });
    });
});