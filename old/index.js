// Initialize Supabase
const supabaseUrl = 'https://oihjfcbbvgyimqhfkyxx.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9paGpmY2Jidmd5aW1xaGZreXh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1MjA2NDAsImV4cCI6MjA1MjA5NjY0MH0.2X3TZ7ewTnH4TJhlPeuWm7xeynekU08mOGEG_LoZFgg';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Function to update the copyright year
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    document.getElementById('copyright-year').textContent = currentYear;
}

document.addEventListener('DOMContentLoaded', function () {
    // Update the copyright year
    updateCopyrightYear();

    // Initialize Materialize components
    M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
    M.CharacterCounter.init(document.querySelectorAll('input'), {});

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Fetch and display gigs when the page loads
    fetchGigs();

    // Handle gig form submission
    document.getElementById('gigForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        // Collect form data
        const gigTitle = document.getElementById('gigTitle').value;
        const gigDescription = document.getElementById('gigDescription').value;
        const gigLocation = document.getElementById('gigLocation').value;
        const gigBudget = document.getElementById('gigBudget').value;

        // Insert gig into Supabase
        const { data, error } = await _supabase
            .from('gigz')
            .insert([{ title: gigTitle, description: gigDescription, location: gigLocation, budget: gigBudget }])
            .select();

        if (error) {
            console.error('Error inserting gig:', error);
            alert('Failed to post gig. Please try again.');
        } else {
            // Add the new gig to the UI
            const gigCard = createGigCard(data[0].title, data[0].description, data[0].location, data[0].budget);
            document.getElementById('gigList').appendChild(gigCard);

            // Clear the form
            document.getElementById('gigForm').reset();
        }
    });

    // Handle search input
    document.getElementById('searchInput').addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        filterGigs(searchTerm);
    });
});

// Function to fetch gigs from Supabase
async function fetchGigs() {
    const { data, error } = await _supabase
        .from('gigz')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching gigs:', error);
        return;
    }

    // Display gigs in the UI
    const gigList = document.getElementById('gigList');
    gigList.innerHTML = ''; // Clear existing gigs

    data.forEach(gig => {
        const gigCard = createGigCard(gig.title, gig.description, gig.location, gig.budget);
        gigList.appendChild(gigCard);
    });
}

// Function to filter gigs based on search term
function filterGigs(searchTerm) {
    const gigCards = document.querySelectorAll('.card');
    gigCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const location = card.querySelector('p:nth-of-type(2)').textContent.toLowerCase();
        const budget = card.querySelector('.budget').textContent.toLowerCase();

        if (title.includes(searchTerm) || location.includes(searchTerm) || budget.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Function to create a gig card
function createGigCard(title, description, location, budget) {
    const card = document.createElement('div');
    card.classList.add('col', 's12', 'm6', 'l4');
    card.setAttribute('data-aos', 'fade-up');

    card.innerHTML = `
        <div class="card">
            <div class="card-content">
                <span class="card-title">${title}</span>
                <p>${description}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p class="budget"><strong>Budget:</strong> $${budget}</p>
            </div>
        </div>
    `;

    return card;
}

// Subscribe to real-time updates
_supabase
    .channel('gigz')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'gigs' }, (payload) => {
        // Add the new gig to the UI
        const gigCard = createGigCard(payload.new.title, payload.new.description, payload.new.location, payload.new.budget);
        document.getElementById('gigList').appendChild(gigCard);
    })
    .subscribe();