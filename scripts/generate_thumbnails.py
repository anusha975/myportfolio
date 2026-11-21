import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUTPUT_DIR = r'public\assets\thumbnails'
os.makedirs(OUTPUT_DIR, exist_ok=True)

FONT_REG = r'C:\Windows\Fonts\segoeui.ttf'
FONT_BOLD = r'C:\Windows\Fonts\segoeuib.ttf'
FONT_MONO = r'C:\Windows\Fonts\consola.ttf'
FONT_MONO_BOLD = r'C:\Windows\Fonts\consolab.ttf'

W, H = 1280, 720

def create_base_canvas(accent_color=(229, 9, 36)):
    """Creates a 1280x720 cinematic dark canvas with radial glow, subtle grid, and soft header backing."""
    img = Image.new('RGBA', (W, H), (10, 10, 14, 255))
    draw = ImageDraw.Draw(img)

    # Subtle grid
    grid_color = (255, 255, 255, 10)
    for x in range(0, W, 40):
        draw.line([(x, 0), (x, H)], fill=grid_color, width=1)
    for y in range(0, H, 40):
        draw.line([(0, y), (W, y)], fill=grid_color, width=1)

    # Atmospheric glow layer
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow)
    
    # Top-right glow
    for r in range(500, 50, -40):
        a = int(35 * (1 - r / 500))
        g_draw.ellipse([W - 200 - r, 120 - r, W - 200 + r, 120 + r], fill=(accent_color[0], accent_color[1], accent_color[2], a))
    
    # Bottom-left glow
    for r in range(400, 50, -40):
        a = int(30 * (1 - r / 400))
        g_draw.ellipse([160 - r, H - 120 - r, 160 + r, H - 120 + r], fill=(180, 10, 30, a))

    # Center-left subtle highlight
    for r in range(300, 50, -30):
        a = int(20 * (1 - r / 300))
        g_draw.ellipse([300 - r, 400 - r, 300 + r, 400 + r], fill=(accent_color[0], accent_color[1], accent_color[2], a))

    glow = glow.filter(ImageFilter.GaussianBlur(60))
    img = Image.alpha_composite(img, glow)

    # Soft dark header backing to prevent grid from crossing text
    header_shade = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    hs_draw = ImageDraw.Draw(header_shade)
    hs_draw.rectangle([0, 0, W, 160], fill=(8, 8, 12, 220))
    header_shade = header_shade.filter(ImageFilter.GaussianBlur(16))
    img = Image.alpha_composite(img, header_shade)

    return img

def draw_glass_card(draw, box, fill=(18, 18, 26, 215), border=(255, 255, 255, 30), radius=16):
    """Draws a rounded glassmorphic rectangle."""
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=border, width=1)

def draw_header(draw, category, title, subtitle):
    font_cat = ImageFont.truetype(FONT_BOLD, 13)
    font_title = ImageFont.truetype(FONT_BOLD, 28)
    font_sub = ImageFont.truetype(FONT_REG, 15)

    # Category Chip
    cat_text = f"  {category.upper()}  "
    w_chip = int(len(cat_text) * 8.6)
    draw.rounded_rectangle([48, 32, 48 + w_chip, 60], radius=14, fill=(229, 9, 36, 45), outline=(229, 9, 36, 180), width=1)
    draw.text((58, 38), category.upper(), font=font_cat, fill=(255, 85, 100, 255))

    # Title
    draw.text((48, 72), title, font=font_title, fill=(255, 255, 255, 255))
    # Subtitle
    draw.text((48, 110), subtitle, font=font_sub, fill=(170, 170, 185, 255))

    # Divider bar
    draw.line([(48, 142), (W - 48, 142)], fill=(255, 255, 255, 30), width=1)


# ==========================================
# 1. PNEUMONIA DETECTION THUMBNAIL
# ==========================================
def generate_pneumonia_thumb():
    img = create_base_canvas(accent_color=(229, 9, 36))
    draw = ImageDraw.Draw(img)

    draw_header(
        draw,
        category="Explainable AI • Deep Learning",
        title="EXPLAINABLE PNEUMONIA DETECTION",
        subtitle="Clinical ResNet-50 Chest Radiograph Classifier with Grad-CAM Saliency Maps"
    )

    # Left: Medical Radiograph with Heatmap
    xray_box = [48, 165, 520, 670]
    draw_glass_card(draw, xray_box, fill=(12, 12, 18, 235), border=(229, 9, 36, 90))

    # Inside X-ray view: Rib cage & lung silhouette representation
    lung_glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    lg_draw = ImageDraw.Draw(lung_glow)
    
    # Left & Right lung cavities
    lg_draw.ellipse([110, 250, 260, 570], fill=(25, 32, 50, 190))
    lg_draw.ellipse([300, 250, 450, 570], fill=(25, 32, 50, 190))
    
    # Rib curves
    for y_rib in range(290, 550, 42):
        lg_draw.arc([100, y_rib, 270, y_rib + 80], start=180, end=340, fill=(75, 95, 125, 180), width=3)
        lg_draw.arc([290, y_rib, 460, y_rib + 80], start=200, end=360, fill=(75, 95, 125, 180), width=3)

    # Grad-CAM heatmap over right lung consolidation
    for rad in range(125, 20, -15):
        alpha = int(140 * (1 - rad / 125))
        if rad > 80:
            c = (0, 180, 255, alpha)
        elif rad > 45:
            c = (255, 190, 0, alpha + 30)
        else:
            c = (235, 20, 40, alpha + 60)
        lg_draw.ellipse([310 - rad, 430 - rad, 310 + rad, 430 + rad], fill=c)

    lung_glow = lung_glow.filter(ImageFilter.GaussianBlur(15))
    img = Image.alpha_composite(img, lung_glow)
    draw = ImageDraw.Draw(img)

    # Attention box
    draw.rectangle([210, 330, 420, 530], outline=(229, 9, 36, 220), width=2)
    font_mono = ImageFont.truetype(FONT_MONO_BOLD, 12)
    font_bold = ImageFont.truetype(FONT_BOLD, 14)

    draw.text((216, 336), "GRAD-CAM SALIENCY ZONE [RIGHT LOWER LOBE]", font=font_mono, fill=(255, 90, 100))

    # Right: AI Clinical Telemetry Cards
    card1 = [550, 165, W - 48, 305]
    draw_glass_card(draw, card1, fill=(20, 10, 14, 225), border=(229, 9, 36, 120))
    draw.text((575, 185), "DIAGNOSTIC PREDICTION", font=font_mono, fill=(229, 9, 36))
    draw.text((575, 208), "PNEUMONIA DETECTED", font=ImageFont.truetype(FONT_BOLD, 24), fill=(255, 255, 255))
    draw.text((575, 248), "Model Confidence: 94.8%  (Threshold: 50.0%)", font=font_mono, fill=(200, 200, 210))
    draw.rounded_rectangle([575, 270, 1100, 285], radius=7, fill=(35, 35, 45))
    draw.rounded_rectangle([575, 270, 575 + int((1100-575)*0.948), 285], radius=7, fill=(229, 9, 36))

    card2 = [550, 325, W - 48, 515]
    draw_glass_card(draw, card2, fill=(16, 18, 25, 225), border=(255, 255, 255, 30))
    draw.text((575, 345), "EXPLAINABILITY & MODEL ARCHITECTURE", font=font_mono, fill=(100, 200, 255))
    
    specs = [
        ("Base Model:", "ResNet-50 Transfer Learning Backbone"),
        ("Explainability:", "Grad-CAM (Gradient-Weighted Class Activation Mapping)"),
        ("Dataset Size:", "3,000+ Validated Chest Radiographs (NIH/Kaggle)"),
        ("Validation Accuracy:", "91.8% Diagnostic Accuracy (ROC-AUC: 0.96)"),
        ("Deployment:", "Interactive Clinical Streamlit Web Interface"),
    ]
    y_s = 374
    for label, val in specs:
        draw.text((575, y_s), label, font=font_mono, fill=(160, 160, 175))
        draw.text((750, y_s), val, font=font_bold, fill=(240, 240, 250))
        y_s += 24

    card3 = [550, 535, W - 48, 670]
    draw_glass_card(draw, card3, fill=(14, 16, 22, 225), border=(255, 255, 255, 20))
    draw.text((575, 552), "CORE TECHNOLOGIES & TOOLS", font=font_mono, fill=(255, 180, 50))
    
    techs = ["Python", "TensorFlow", "ResNet-50", "Grad-CAM", "OpenCV", "Streamlit"]
    x_badge = 575
    y_badge = 588
    for t in techs:
        w_b = len(t) * 9 + 24
        draw.rounded_rectangle([x_badge, y_badge, x_badge + w_b, y_badge + 34], radius=17, fill=(30, 32, 42), outline=(229, 9, 36, 100))
        draw.text((x_badge + 12, y_badge + 8), t, font=font_bold, fill=(255, 255, 255))
        x_badge += w_b + 12

    img.convert('RGB').save(os.path.join(OUTPUT_DIR, 'project-pneumonia.jpg'), quality=95)
    print("Generated project-pneumonia.jpg")


# ==========================================
# 2. RAG-BASED PDF ASSISTANT THUMBNAIL
# ==========================================
def generate_rag_thumb():
    img = create_base_canvas(accent_color=(0, 150, 255))
    draw = ImageDraw.Draw(img)

    draw_header(
        draw,
        category="Generative AI • Vector Search",
        title="RAG-BASED PDF ASSISTANT",
        subtitle="Document Question-Answering Pipeline with Semantic Chunking & ChromaDB Retrieval"
    )

    font_mono = ImageFont.truetype(FONT_MONO_BOLD, 12)
    font_bold = ImageFont.truetype(FONT_BOLD, 14)

    doc_box = [48, 165, 480, 670]
    draw_glass_card(draw, doc_box, fill=(14, 16, 24, 235), border=(0, 150, 255, 90))
    draw.text((70, 185), "DOCUMENT INGESTION & CHUNKING", font=font_mono, fill=(0, 180, 255))

    draw.rounded_rectangle([70, 218, 458, 645], radius=12, fill=(22, 24, 34), outline=(255, 255, 255, 20))
    draw.rounded_rectangle([70, 218, 458, 262], radius=12, fill=(229, 9, 36, 180))
    draw.text((88, 232), "TECHNICAL_SPECIFICATION_v2.PDF", font=font_mono, fill=(255, 255, 255))

    chunks = [
        ("CHUNK #01 (Tokens: 512 | Vector ID: 89a)", "System architecture incorporates dual-redundant microcontrollers with MQTT telemetry..."),
        ("CHUNK #02 (Tokens: 480 | Vector ID: 94c)", "Operating parameters require threshold limits below 75°C under continuous load..."),
        ("CHUNK #03 (Tokens: 512 | Vector ID: a2f)", "Vector embeddings generated using text-embedding-ada-002 with 1536 dimensions..."),
    ]
    y_c = 282
    for c_id, snippet in chunks:
        draw.rounded_rectangle([86, y_c, 442, y_c + 98], radius=8, fill=(30, 34, 48), outline=(0, 150, 255, 70))
        draw.text((98, y_c + 10), c_id, font=ImageFont.truetype(FONT_MONO_BOLD, 11), fill=(0, 200, 255))
        draw.text((98, y_c + 32), snippet[:46], font=ImageFont.truetype(FONT_REG, 11), fill=(200, 200, 215))
        draw.text((98, y_c + 50), snippet[46:], font=ImageFont.truetype(FONT_REG, 11), fill=(160, 160, 175))
        draw.text((98, y_c + 73), "Cosine Similarity: 0.942  |  FAISS Indexed", font=ImageFont.truetype(FONT_MONO, 10), fill=(100, 255, 150))
        y_c += 114

    card_q = [510, 165, W - 48, 295]
    draw_glass_card(draw, card_q, fill=(16, 20, 32, 225), border=(0, 150, 255, 110))
    draw.text((535, 185), "USER PROMPT (NATURAL LANGUAGE)", font=font_mono, fill=(0, 180, 255))
    draw.text((535, 212), "\"What are the maximum operating threshold limits defined in Section 3?\"", font=ImageFont.truetype(FONT_BOLD, 16), fill=(255, 255, 255))
    draw.text((535, 248), "Semantic Retrieval: FAISS / ChromaDB Top-K = 3 chunks retrieved in 42ms", font=font_mono, fill=(100, 255, 180))

    card_a = [510, 315, W - 48, 515]
    draw_glass_card(draw, card_a, fill=(18, 14, 24, 225), border=(229, 9, 36, 100))
    draw.text((535, 335), "GROUNDED LLM RESPONSE (ZERO HALLUCINATION)", font=font_mono, fill=(229, 9, 36))
    
    ans_lines = [
        "Based on Section 3.4 of the uploaded technical PDF:",
        "1. Maximum Operating Temperature: 75.0°C (Automatic cut-off initiated at 80.0°C).",
        "2. Input Voltage: Regulated 24V DC (+/- 5% tolerance).",
        "3. Telemetry Ingestion: MQTT broadcast every 500ms to AWS IoT Core.",
        "",
        "Grounding Sources: [Page 14, Chunk 02] | [Page 19, Chunk 07]",
    ]
    y_ans = 364
    for al in ans_lines:
        c_al = (255, 215, 0) if "Grounding Sources:" in al else (230, 230, 240)
        draw.text((535, y_ans), al, font=ImageFont.truetype(FONT_REG if "Based" in al or "Grounding" not in al else FONT_BOLD, 13), fill=c_al)
        y_ans += 21

    card_b = [510, 535, W - 48, 670]
    draw_glass_card(draw, card_b, fill=(14, 16, 22, 225), border=(255, 255, 255, 20))
    draw.text((535, 552), "RAG ARCHITECTURE STACK", font=font_mono, fill=(180, 180, 200))
    
    r_techs = ["Python", "LangChain", "FAISS", "ChromaDB", "LLMs", "RAG Pipeline"]
    x_badge = 535
    y_badge = 588
    for t in r_techs:
        w_b = len(t) * 9 + 24
        draw.rounded_rectangle([x_badge, y_badge, x_badge + w_b, y_badge + 34], radius=17, fill=(26, 30, 44), outline=(0, 150, 255, 90))
        draw.text((x_badge + 12, y_badge + 8), t, font=font_bold, fill=(255, 255, 255))
        x_badge += w_b + 12

    img.convert('RGB').save(os.path.join(OUTPUT_DIR, 'project-rag-pdf.jpg'), quality=95)
    print("Generated project-rag-pdf.jpg")


# ==========================================
# 3. FIRE DETECTION & WATER SPRINKLER THUMBNAIL
# ==========================================
def generate_fire_thumb():
    img = create_base_canvas(accent_color=(240, 50, 20))
    draw = ImageDraw.Draw(img)

    draw_header(
        draw,
        category="IoT • Embedded Systems • Actuation",
        title="AUTOMATIC FIRE DETECTION & WATER SPRINKLER",
        subtitle="Autonomous ESP32 Flame & Temperature Sensing with Instant Solenoid Valve Suppression"
    )

    font_mono = ImageFont.truetype(FONT_MONO_BOLD, 12)
    font_bold = ImageFont.truetype(FONT_BOLD, 14)

    panel1 = [48, 165, 530, 670]
    draw_glass_card(draw, panel1, fill=(18, 10, 12, 235), border=(240, 50, 20, 100))
    draw.text((70, 185), "ESP32 HARDWARE SENSOR TELEMETRY", font=font_mono, fill=(255, 80, 50))

    # Flame Sensor Gauge
    draw.rounded_rectangle([70, 220, 508, 340], radius=12, fill=(28, 16, 20), outline=(240, 50, 20, 80))
    draw.text((88, 236), "FLAME SENSOR S1-IR:  CRITICAL DETECTION", font=font_mono, fill=(255, 100, 70))
    draw.text((88, 260), "FLAME INTENSITY: 98.4%", font=ImageFont.truetype(FONT_BOLD, 22), fill=(255, 50, 50))
    draw.text((88, 295), "ADC Value: 3912 / 4095  |  Threshold: 2200", font=font_mono, fill=(200, 200, 210))
    draw.rounded_rectangle([88, 315, 490, 327], radius=6, fill=(50, 20, 25))
    draw.rounded_rectangle([88, 315, 490, 327], radius=6, fill=(240, 50, 20))

    # Temperature Gauge
    draw.rounded_rectangle([70, 360, 508, 480], radius=12, fill=(28, 16, 20), outline=(240, 50, 20, 80))
    draw.text((88, 376), "TEMPERATURE SENSOR:  HIGH HEAT WARNING", font=font_mono, fill=(255, 160, 40))
    draw.text((88, 400), "ZONE TEMP: 82.5°C", font=ImageFont.truetype(FONT_BOLD, 22), fill=(255, 160, 40))
    draw.text((88, 435), "Rate of Rise: +14.2°C/min  |  Safety Cutoff: 65°C", font=font_mono, fill=(200, 200, 210))
    draw.rounded_rectangle([88, 455, 490, 467], radius=6, fill=(50, 30, 20))
    draw.rounded_rectangle([88, 455, 88 + int((490-88)*0.82), 467], radius=6, fill=(255, 140, 0))

    # Solenoid Relay Valve Status
    draw.rounded_rectangle([70, 500, 508, 645], radius=12, fill=(229, 9, 36, 40), outline=(229, 9, 36, 180))
    draw.text((88, 516), "ACTUATOR RELAY #01 STATUS", font=font_mono, fill=(255, 90, 90))
    draw.text((88, 540), "WATER SPRINKLER: ACTIVE [DISCHARGING]", font=ImageFont.truetype(FONT_BOLD, 18), fill=(255, 255, 255))
    draw.text((88, 575), "Solenoid: ENERGIZED  |  Pressure: 4.8 BAR", font=font_mono, fill=(100, 255, 150))
    draw.text((88, 600), "Suppression Time Elapsed: 00:01:24", font=font_mono, fill=(200, 200, 210))

    # Right: MQTT Telemetry & Embedded Architecture
    panel2 = [560, 165, W - 48, 420]
    draw_glass_card(draw, panel2, fill=(14, 16, 24, 225), border=(255, 255, 255, 30))
    draw.text((585, 185), "MQTT WIRELESS TELEMETRY STREAM", font=font_mono, fill=(0, 200, 255))

    logs = [
        "[00:00:01] ESP32 boot OK. Wi-Fi connected to SSID: Industrial-IoT-Secured",
        "[00:00:02] MQTT Broker connected: mqtt://broker.iot-solutions.net:1883",
        "[00:04:12] SENSOR ALERT: S1-IR flame threshold breached (val: 3912)",
        "[00:04:12] GPIO 23 PULSED HIGH -> Solenoid Relay K1 Actuated",
        "[00:04:13] MQTT PUB -> /facility/zone-4/fire/status: {'state': 'EMERGENCY'}",
        "[00:04:14] Audio-Visual Siren activated. Water sprinkler suppression active.",
        "[00:04:15] Cloud Dashboard updated: Fire suppressed in 3.2 seconds.",
    ]
    y_l = 215
    for l in logs:
        c_l = (255, 70, 70) if "ALERT" in l or "EMERGENCY" in l else ((100, 255, 150) if "OK" in l or "connected" in l else (190, 190, 210))
        draw.text((585, y_l), l, font=ImageFont.truetype(FONT_MONO, 11), fill=c_l)
        y_l += 26

    panel3 = [560, 440, W - 48, 670]
    draw_glass_card(draw, panel3, fill=(16, 18, 25, 225), border=(255, 255, 255, 20))
    draw.text((585, 460), "EMBEDDED HARDWARE ARCHITECTURE", font=font_mono, fill=(255, 180, 50))
    
    emb_specs = [
        ("Microcontroller:", "ESP32 Dual-Core Tensilica LX6 (240MHz)"),
        ("Firmware Stack:", "Embedded C / FreeRTOS Task Scheduling"),
        ("Communication:", "MQTT / TCP-IP / REST Telemetry Pipeline"),
        ("Sensors & Actuators:", "Infrared Flame, Thermistor, 5V Relay Solenoid Valve"),
        ("Response Latency:", "< 150ms from Detection to Physical Actuation"),
    ]
    y_es = 492
    for label, val in emb_specs:
        draw.text((585, y_es), label, font=font_mono, fill=(160, 160, 175))
        draw.text((760, y_es), val, font=font_bold, fill=(240, 240, 250))
        y_es += 25

    img.convert('RGB').save(os.path.join(OUTPUT_DIR, 'project-fire-sprinkler.jpg'), quality=95)
    print("Generated project-fire-sprinkler.jpg")


# ==========================================
# 4. BUY FOR ME: AI COMMERCE AGENT THUMBNAIL
# ==========================================
def generate_commerce_thumb():
    img = create_base_canvas(accent_color=(235, 100, 20))
    draw = ImageDraw.Draw(img)

    draw_header(
        draw,
        category="Agentic AI • Conversational Commerce • Fintech",
        title="BUY FOR ME: AI COMMERCE AGENT",
        subtitle="Autonomous Natural-Language Shopping Assistant with Multi-Item Cart & Razorpay Checkout"
    )

    font_mono = ImageFont.truetype(FONT_MONO_BOLD, 12)
    font_bold = ImageFont.truetype(FONT_BOLD, 14)

    box1 = [48, 165, 600, 670]
    draw_glass_card(draw, box1, fill=(16, 16, 24, 235), border=(255, 120, 30, 90))
    draw.text((70, 185), "CONVERSATIONAL AGENT EXECUTION FLOW", font=font_mono, fill=(255, 140, 50))

    # User Query Bubble
    draw.rounded_rectangle([70, 215, 578, 280], radius=12, fill=(35, 30, 45), outline=(255, 255, 255, 30))
    draw.text((88, 228), "USER REQUEST:", font=font_mono, fill=(180, 180, 200))
    draw.text((88, 248), "\"Find me an organic daily skincare routine under $50 with SPF.\"", font=font_bold, fill=(255, 255, 255))

    # Agent Internal Reasoning Loop
    draw.rounded_rectangle([70, 300, 578, 425], radius=12, fill=(24, 20, 32), outline=(255, 120, 30, 60))
    draw.text((88, 314), "AGENT REASONING PIPELINE (LLM + TOOL USE)", font=font_mono, fill=(255, 150, 60))
    agent_steps = [
        "1. [PARSE INTENT] Target category: Skincare | Constraints: Organic, SPF, Budget: <$50",
        "2. [CATALOG SEARCH] Semantic search over 2,400+ product vectors via API",
        "3. [OPTIMIZATION] Selected 3 compatible items totaling $48.50 ($1.50 under budget)",
        "4. [CART SYNTHESIS] Assembled multi-item basket; initiated Razorpay order token",
    ]
    y_step = 338
    for s in agent_steps:
        draw.text((88, y_step), s, font=ImageFont.truetype(FONT_REG, 11), fill=(210, 210, 225))
        y_step += 20

    # Agent Response
    draw.rounded_rectangle([70, 445, 578, 645], radius=12, fill=(20, 28, 24), outline=(16, 185, 129, 90))
    draw.text((88, 462), "AI AGENT RECOMMENDATION", font=font_mono, fill=(16, 185, 129))
    draw.text((88, 486), "\"I've curated the perfect 3-step routine within your budget:", font=font_bold, fill=(255, 255, 255))
    items = [
        ("• Pure Botanical Cleanser (Organic)", "$14.00"),
        ("• Hydrating Niacinamide Serum", "$16.00"),
        ("• Mineral Matte Sunscreen SPF 50", "$18.50"),
    ]
    y_item = 516
    for it, pr in items:
        draw.text((98, y_item), it, font=ImageFont.truetype(FONT_REG, 13), fill=(220, 220, 230))
        draw.text((490, y_item), pr, font=font_bold, fill=(100, 255, 180))
        y_item += 24

    draw.line([(88, 595), (558, 595)], fill=(255, 255, 255, 30), width=1)
    draw.text((88, 610), "Total Cart: $48.50", font=font_bold, fill=(255, 255, 255))
    draw.text((400, 610), "Savings: $11.50 vs MSRP", font=font_mono, fill=(100, 255, 150))

    # Right: Razorpay Checkout Integration & Agent Stats
    box2 = [630, 165, W - 48, 410]
    draw_glass_card(draw, box2, fill=(14, 18, 30, 225), border=(0, 150, 255, 90))
    draw.text((655, 185), "RAZORPAY SECURE PAYMENT GATEWAY", font=font_mono, fill=(0, 180, 255))

    draw.rounded_rectangle([655, 215, W - 72, 385], radius=12, fill=(10, 20, 40), outline=(0, 150, 255, 80))
    draw.text((675, 235), "RAZORPAY ORDER ID: order_Nzx782kL90", font=font_mono, fill=(150, 200, 255))
    draw.text((675, 265), "AMOUNT PAYABLE: $48.50 USD", font=ImageFont.truetype(FONT_BOLD, 22), fill=(255, 255, 255))
    draw.text((675, 302), "Status: VERIFIED & READY FOR CHECKOUT", font=font_mono, fill=(16, 185, 129))
    draw.text((675, 328), "Multi-Item Webhook Payload: 3 items • Tax: Included • Shipping: Free", font=ImageFont.truetype(FONT_REG, 11), fill=(180, 180, 200))
    draw.text((675, 350), "Supported: UPI, Cards, NetBanking, International Wallets", font=ImageFont.truetype(FONT_REG, 11), fill=(140, 140, 160))

    box3 = [630, 430, W - 48, 670]
    draw_glass_card(draw, box3, fill=(16, 18, 25, 225), border=(255, 255, 255, 20))
    draw.text((655, 450), "AGENTIC COMMERCE STACK", font=font_mono, fill=(255, 180, 50))
    
    c_specs = [
        ("Architecture:", "Autonomous Generative AI Agent with Function Calling"),
        ("NLP Parser:", "Few-Shot Intent Extraction & Budget Constraint Enforcement"),
        ("Fintech Gateway:", "Razorpay REST API & Dynamic Webhook Order Validation"),
        ("Catalog Engine:", "Vectorized Semantic Search across Multi-Item Inventories"),
    ]
    y_cs = 480
    for label, val in c_specs:
        draw.text((655, y_cs), label, font=font_mono, fill=(160, 160, 175))
        draw.text((800, y_cs), val, font=font_bold, fill=(240, 240, 250))
        y_cs += 26

    c_badges = ["Generative AI", "LLM Agents", "NLP", "Razorpay", "E-Commerce", "Python"]
    x_b = 655
    y_b = 600
    for b in c_badges:
        w_b = len(b) * 9 + 20
        draw.rounded_rectangle([x_b, y_b, x_b + w_b, y_b + 32], radius=16, fill=(30, 32, 45), outline=(255, 120, 30, 90))
        draw.text((x_b + 10, y_b + 7), b, font=font_bold, fill=(255, 255, 255))
        x_b += w_b + 10

    img.convert('RGB').save(os.path.join(OUTPUT_DIR, 'project-commerce-agent.jpg'), quality=95)
    print("Generated project-commerce-agent.jpg")


# ==========================================
# 5. AI CODE RISK & BUG DETECTION PLATFORM
# ==========================================
def generate_code_risk_thumb():
    img = create_base_canvas(accent_color=(229, 9, 36))
    draw = ImageDraw.Draw(img)

    draw_header(
        draw,
        category="AI Security • Static Analysis • Software Engineering",
        title="AI CODE RISK & BUG DETECTION PLATFORM",
        subtitle="Privacy-Preserving Source Code & PR Vulnerability Auditor with Local AST & ML Scoring"
    )

    font_mono = ImageFont.truetype(FONT_MONO_BOLD, 12)
    font_bold = ImageFont.truetype(FONT_BOLD, 14)

    box1 = [48, 165, 590, 670]
    draw_glass_card(draw, box1, fill=(14, 16, 22, 235), border=(229, 9, 36, 100))
    draw.text((70, 185), "LOCAL STATIC CODE ANALYSIS & AST PARSER", font=font_mono, fill=(229, 9, 36))

    draw.rounded_rectangle([70, 215, 568, 645], radius=10, fill=(18, 20, 28), outline=(255, 255, 255, 20))
    draw.ellipse([85, 230, 95, 240], fill=(255, 95, 86))
    draw.ellipse([103, 230, 113, 240], fill=(255, 189, 46))
    draw.ellipse([121, 230, 131, 240], fill=(39, 201, 63))
    draw.text((150, 228), "auth_service.py [PR #142 AUDIT]", font=font_mono, fill=(160, 160, 180))

    code_lines = [
        ("01", "def handle_user_login(req, db):", (180, 180, 200)),
        ("02", "    user_token = req.headers.get('Auth')", (180, 180, 200)),
        ("03", "    # [FLAG] HARDCODED API SECRET DETECTED", (255, 60, 60)),
        ("04", "    API_SECRET = 'sk-live-982734918237'  # [REDACTED]", (255, 90, 90)),
        ("05", "    if not validate_signature(user_token):", (180, 180, 200)),
        ("06", "        # [BUG] Potential memory leak in unclosed cursor", (255, 180, 40)),
        ("07", "        cur = db.raw_connection().cursor()", (255, 200, 60)),
        ("08", "        raise PermissionError('Unauthorized access')", (180, 180, 200)),
        ("09", "    return execute_query(db, req.payload)", (180, 180, 200)),
    ]
    y_code = 265
    for l_num, text, color in code_lines:
        draw.text((85, y_code), l_num, font=ImageFont.truetype(FONT_MONO, 11), fill=(90, 90, 110))
        draw.text((115, y_code), text, font=ImageFont.truetype(FONT_MONO_BOLD if "#" in text else FONT_MONO, 11), fill=color)
        y_code += 24

    draw.rounded_rectangle([85, 510, 552, 630], radius=8, fill=(35, 12, 16), outline=(229, 9, 36, 140))
    draw.text((98, 524), "SECURITY AUDIT FINDINGS: 2 ISSUES DETECTED", font=font_mono, fill=(255, 70, 70))
    draw.text((98, 550), "• High Severity: Hardcoded secret key discovered (Secret Redacted)", font=ImageFont.truetype(FONT_REG, 11), fill=(255, 200, 200))
    draw.text((98, 574), "• Medium Severity: Unhandled cursor resource exhaustion (CWE-404)", font=ImageFont.truetype(FONT_REG, 11), fill=(255, 200, 150))
    draw.text((98, 598), "• PR Status: Automated Security Block (Requires Patch)", font=font_mono, fill=(255, 120, 120))

    box2 = [620, 165, W - 48, 410]
    draw_glass_card(draw, box2, fill=(20, 12, 16, 225), border=(229, 9, 36, 90))
    draw.text((645, 185), "ML-BASED RISK SCORING & COMPLIANCE", font=font_mono, fill=(229, 9, 36))

    draw.text((645, 215), "OVERALL RISK SCORE", font=font_mono, fill=(180, 180, 200))
    draw.text((645, 238), "86 / 100", font=ImageFont.truetype(FONT_BOLD, 36), fill=(255, 45, 60))
    draw.text((820, 248), "CRITICAL RISK LEVEL", font=font_mono, fill=(255, 80, 80))

    draw.rounded_rectangle([645, 295, W - 75, 312], radius=8, fill=(40, 20, 25))
    draw.rounded_rectangle([645, 295, 645 + int(((W-75)-645)*0.86), 312], radius=8, fill=(229, 9, 36))

    draw.text((645, 330), "Privacy Preservation Status: 100% LOCAL PROCESSING", font=font_mono, fill=(16, 185, 129))
    draw.text((645, 355), "• Zero external LLM transmissions • Local AST traversal • Private RAG indexing", font=ImageFont.truetype(FONT_REG, 12), fill=(200, 200, 215))

    box3 = [620, 430, W - 48, 670]
    draw_glass_card(draw, box3, fill=(16, 18, 25, 225), border=(255, 255, 255, 20))
    draw.text((645, 450), "CORE CAPABILITIES & GITHUB INTEGRATIONS", font=font_mono, fill=(255, 180, 50))

    caps = [
        "Local Static Code Analysis & AST Traversal",
        "Machine Learning-Based Vulnerability & Risk Scoring",
        "Automated Secret Detection & In-Memory Redaction",
        "GitHub Pull Request Analysis & Webhook Auditing",
        "Localized RAG for Context-Aware Recommendations",
    ]
    y_cap = 480
    for cap in caps:
        draw.text((645, y_cap), "[PASS]", font=ImageFont.truetype(FONT_MONO_BOLD, 11), fill=(16, 185, 129))
        draw.text((700, y_cap), cap, font=ImageFont.truetype(FONT_REG, 13), fill=(220, 220, 235))
        y_cap += 24

    sec_badges = ["Python", "Static Analysis", "Machine Learning", "AST Parser", "AI Security", "GitHub APIs"]
    x_sb = 645
    y_sb = 608
    for b in sec_badges:
        w_sb = len(b) * 9 + 18
        draw.rounded_rectangle([x_sb, y_sb, x_sb + w_sb, y_sb + 30], radius=15, fill=(30, 32, 45), outline=(229, 9, 36, 80))
        draw.text((x_sb + 9, y_sb + 6), b, font=font_bold, fill=(255, 255, 255))
        x_sb += w_sb + 8

    img.convert('RGB').save(os.path.join(OUTPUT_DIR, 'project-code-risk.jpg'), quality=95)
    print("Generated project-code-risk.jpg")


if __name__ == '__main__':
    generate_pneumonia_thumb()
    generate_rag_thumb()
    generate_fire_thumb()
    generate_commerce_thumb()
    generate_code_risk_thumb()
    print("All 5 project thumbnails successfully generated!")
