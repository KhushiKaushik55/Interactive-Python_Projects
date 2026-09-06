#GUESS_THE_Number using streamlit
import random
import streamlit as st

#page config
st.set_page_config(
    page_title="Guess the Number 🎯",
    page_icon="🎯",
    layout="centered"
)

# CUSTOM CSS
st.markdown("""
<style>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

html, body, [class*="css"] {
    font-family: 'Poppins', sans-serif;
}

/* Background */
.stApp {
    background:
        radial-gradient(circle at 10% 10%, rgba(99, 102, 241, 0.20), transparent 30%),
        radial-gradient(circle at 90% 20%, rgba(236, 72, 153, 0.18), transparent 30%),
        radial-gradient(circle at 50% 90%, rgba(14, 165, 233, 0.15), transparent 35%),
        linear-gradient(135deg, #09090f, #11111c 45%, #0b1020);
    color: white;
}

/* Hide Streamlit branding */
#MainMenu {
    visibility: hidden;
}

footer {
    visibility: hidden;
}

header {
    background: transparent !important;
}

/* Main container */
.block-container {
    max-width: 720px;
    padding-top: 3rem;
    padding-bottom: 3rem;
}

/* Title */
.game-title {
    text-align: center;
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 0.2rem;

    background: linear-gradient(
        90deg,
        #a78bfa,
        #ec4899,
        #60a5fa
    );

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Subtitle */
.game-subtitle {
    text-align: center;
    color: #b8b8c7;
    font-size: 1rem;
    margin-bottom: 2rem;
}

/* Game card */
.game-card {
    background: rgba(255, 255, 255, 0.055);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 28px;
    padding: 2rem;
    backdrop-filter: blur(18px);
    box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.35),
        inset 0 1px 0 rgba(255,255,255,0.06);
}

/* Range badge */
.range-badge {
    text-align: center;
    margin-bottom: 1.5rem;
}

.range-badge span {
    display: inline-block;
    padding: 8px 18px;
    border-radius: 999px;
    background: rgba(139, 92, 246, 0.15);
    border: 1px solid rgba(139, 92, 246, 0.35);
    color: #c4b5fd;
    font-size: 0.85rem;
    font-weight: 600;
}

/* Attempts */
.attempt-title {
    text-align: center;
    color: #d4d4df;
    font-size: 0.9rem;
    margin-top: 1rem;
}

.attempts {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 12px 0 25px 0;
}

.attempt {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
}

.attempt-used {
    background: linear-gradient(135deg, #ec4899, #8b5cf6);
    color: white;
    box-shadow: 0 5px 18px rgba(236, 72, 153, 0.25);
}

.attempt-left {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    color: #77778a;
}

/* Input */
div[data-baseweb="input"] {
    background: rgba(255,255,255,0.06) !important;
    border-radius: 16px !important;
    border: 1px solid rgba(255,255,255,0.12) !important;
}

div[data-baseweb="input"]:focus-within {
    border: 1px solid #8b5cf6 !important;
    box-shadow: 0 0 0 2px rgba(139,92,246,0.15) !important;
}

input {
    color: black !important;
    font-size: 1.1rem !important;
}

/* Buttons */
.stButton > button {
    width: 100%;
    border: none;
    border-radius: 16px;
    padding: 0.75rem 1rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 1rem;

    background: linear-gradient(
        135deg,
        #8b5cf6,
        #ec4899
    );

    color: white;

    box-shadow:
        0 8px 25px rgba(139,92,246,0.25);

    transition: all 0.2s ease;
}

.stButton > button:hover {
    transform: translateY(-2px);
    box-shadow:
        0 12px 30px rgba(236,72,153,0.30);
}

/* Success */
div[data-testid="stAlert"] {
    border-radius: 16px !important;
}

/* Footer */
.footer {
    text-align: center;
    color: #666679;
    font-size: 0.75rem;
    margin-top: 2rem;
}

</style>
""", unsafe_allow_html=True)

# SESSION STATE
if "random_number" not in st.session_state:
    st.session_state.random_number = random.randint(1, 100)
    st.session_state.attempts = 0
    st.session_state.game_over = False

# HEADER
st.markdown(
    '<div class="game-title">🎯 Guess The Number</div>',
    unsafe_allow_html=True
)

st.markdown(
    '<div class="game-subtitle">'
    'Think smart. Guess wisely. Beat the number.'
    '</div>',
    unsafe_allow_html=True
)

# GAME CARD
st.markdown('<div class="game-card">', unsafe_allow_html=True)

st.markdown(
    '<div class="range-badge">'
    '<span>🔢 NUMBER RANGE · 1 — 100</span>'
    '</div>',
    unsafe_allow_html=True
)

st.markdown(
    '<p style="text-align:center; color:#d4d4df;">'
    'I have secretly picked a number between '
    '<b>1 and 100</b>.<br>'
    'Can you find it in just <b>5 attempts?</b>'
    '</p>',
    unsafe_allow_html=True
)

# ATTEMPT INDICATORS

st.markdown(
    '<div class="attempt-title">YOUR ATTEMPTS</div>',
    unsafe_allow_html=True
)

attempt_html = '<div class="attempts">'

for i in range(5):

    if i < st.session_state.attempts:
        attempt_html += (
            '<div class="attempt attempt-used">✓</div>'
        )
    else:
        attempt_html += (
            '<div class="attempt attempt-left">?</div>'
        )

attempt_html += '</div>'

st.markdown(
    attempt_html,
    unsafe_allow_html=True
)

# INPUT
guess = st.number_input(
    "Your guess",
    min_value=1,
    max_value=100,
    step=1,
    value=50,
    disabled=st.session_state.game_over
)

# SUBMIT
if st.button(
    "🚀 LOCK IN MY GUESS",
    disabled=st.session_state.game_over
):

    st.session_state.attempts += 1

    remaining_chances = (
        5 - st.session_state.attempts
    )

    # Correct
    if guess == st.session_state.random_number:

        st.success(
            f"🎉 YOU GOT IT! "
            f"The number was **{st.session_state.random_number}**!"
        )

        st.balloons()

        st.markdown(
            f"""
            <div style="
                text-align:center;
                padding:15px;
                margin-top:10px;
                border-radius:16px;
                background:rgba(34,197,94,0.10);
                border:1px solid rgba(34,197,94,0.25);
            ">
                <div style="font-size:2rem;">🏆</div>
                <b>You found it in {st.session_state.attempts} attempts!</b>
            </div>
            """,
            unsafe_allow_html=True
        )

        st.session_state.game_over = True

    # Too low
    elif guess < st.session_state.random_number:

        if remaining_chances > 0:
            st.warning(
                f"📈 Too low! "
                f"Try something **higher**."
                f"🔥 Chances remaining: **{remaining_chances}**",
                icon="⬆️"
            )

    # Too high
    else:

        if remaining_chances > 0:
            st.warning(
                f"📉 Too high! "
                f"Try something **lower**."
                f"🔥 Chances remaining: **{remaining_chances}**",
                icon="⬇️"
            )

    # Game over
    if (
        st.session_state.attempts >= 5
        and guess != st.session_state.random_number
    ):

        st.error(
            f"💀 Game Over! "
            f"The number was **{st.session_state.random_number}**."
        )

        st.markdown(
            """
            <div style="
                text-align:center;
                color:#a1a1b2;
                margin-top:10px;
            ">
                Don't worry. Even legends need a rematch. 😎
            </div>
            """,
            unsafe_allow_html=True
        )

        st.session_state.game_over = True

# PLAY AGAIN
if st.session_state.game_over:

    st.markdown("<br>", unsafe_allow_html=True)

    if st.button("🔄 PLAY AGAIN"):

        st.session_state.random_number = random.randint(
            1, 100
        )

        st.session_state.attempts = 0
        st.session_state.game_over = False

        st.rerun()


st.markdown('</div>', unsafe_allow_html=True)

# FOOTER
st.markdown(
    '<div class="footer">'
    'Made with Python 🐍 + Streamlit ⚡'
    '</div>',
    unsafe_allow_html=True
)
