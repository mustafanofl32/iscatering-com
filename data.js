// ISCatering.com — catering planning reference.
// Original editorial. Planning figures are conventional industry rules of thumb, not guarantees;
// every page says so. No company, menu, price list or review on this site is invented.

const guides = [
  {
    slug: "service-styles",
    title: "Service styles compared",
    img: "service-styles",
    lede: "Buffet, plated, family style, stations and passed canapes, and what each one does to your staffing, your timing and your food quantities.",
    body: [
      ["Why the style decides the budget",
       ["The service style is usually settled before the menu, because it drives almost everything else: how many staff you need, how long the meal takes, how much food is prepared, and how much equipment is rented.",
        "A plated dinner needs the most kitchen and service staff but the least food per guest, because the portion is fixed. A buffet needs fewer servers but more food, because guests serve themselves and take more than a kitchen would plate. The saving on labour is often smaller than people expect once the extra food, chafing dishes and buffet tables are counted."]],
      ["Plated (sit-down)",
       ["Guests are seated and each course is brought to the table. Portions are controlled, presentation is at its best, and the meal follows a clear timeline.",
        "It is the most staff-heavy option. It also needs a final headcount and a meal choice per guest, which means place cards or meal indicators, and a kitchen with enough finishing space to send a whole course at once."]],
      ["Buffet",
       ["Guests queue and serve themselves. Fewer servers are needed, guests choose their own portions, and a wide menu is easy to offer.",
        "Plan more food than a plated service, keep the queue moving by setting up double-sided lines, and remember that a single line serves roughly 50 to 75 guests before the wait becomes noticeable."]],
      ["Family style",
       ["Platters are placed on each table and guests pass them. It feels generous and sociable and needs fewer servers than plated.",
        "It costs table space, because platters compete with glasses and centrepieces, and it uses more food than plated service. Round tables of eight to ten work better than long tables."]],
      ["Stations",
       ["Separate food stations around the room, often with a chef finishing dishes to order. Good for mingling events and for offering variety.",
        "Stations spread the crowd out and remove the single queue, but each one needs its own equipment, and often its own attendant. Count the attendants as staff, not as extras."]],
      ["Passed canapes (butler service)",
       ["Servers circulate with trays. Best for receptions and for the first hour of an evening event.",
        "It needs more servers than a stationary display of the same food, because the trays have to keep moving. Passed service also makes it harder for guests to overeat early, which is sometimes the point."]]
    ]
  },
  {
    slug: "portion-planning",
    title: "Portion planning",
    img: "portions",
    lede: "The per-guest figures caterers work from, what changes them, and where they go wrong.",
    body: [
      ["The starting point",
       ["Most caterers begin from a total of roughly 500 to 700 grams (about 1 to 1.5 pounds) of food per adult for a full meal, spread across protein, starch and vegetables. That total is a planning figure, not a serving size. It exists so nothing runs out.",
        "Common per-adult starting points for a main meal: 170 to 225 grams (6 to 8 ounces) of boneless protein, 115 to 170 grams (4 to 6 ounces) of starch, 115 to 170 grams (4 to 6 ounces) of vegetables, one to two bread rolls, and one dessert portion."]],
      ["What moves the numbers up",
       ["A buffet, because guests plate themselves. A long event, because people keep grazing. A young adult crowd. Heavy manual work before the meal, such as a build day or a sports event. Alcohol served for more than about two hours. A menu with one obvious star dish, which everyone takes first.",
        "Bone-in meat needs a larger raw weight for the same edible portion. For bone-in cuts, plan roughly 340 to 450 grams (12 to 16 ounces) per adult."]],
      ["What moves them down",
       ["A plated service. A short lunch. A menu with many components, because each guest takes less of each. An older or mixed corporate crowd. A dessert table that follows a full meal.",
        "Children are usually planned at about half an adult portion, and teenagers at an adult portion or more."]],
      ["Canapes and receptions",
       ["For a reception before a meal, plan four to six pieces per guest for the first hour. For a reception that replaces the meal, plan ten to fourteen pieces per guest over two hours, across at least six varieties.",
        "Cold items can be laid out in advance; hot items have to be timed, which is a staffing question as much as a kitchen one."]],
      ["The waste question",
       ["Over-ordering is the normal failure, and it is expensive. The usual compromise is to plan full quantities for the signature dish and slightly under for the rest, then keep a small reserve in the kitchen rather than putting everything out at once.",
        "Agree in the contract who owns the leftovers and whether they can legally be taken away. In many places a caterer cannot hand over food that has been held at the wrong temperature, whatever the client wants."]]
    ]
  },
  {
    slug: "staffing-guide",
    title: "Staffing an event",
    img: "staffing",
    lede: "How many servers, bartenders and kitchen staff an event needs, and the hours nobody counts.",
    body: [
      ["Servers",
       ["The conventional ratios are one server per 8 to 12 guests for plated service, one per 20 to 25 for a buffet, and one per 12 to 15 for family style. Passed canapes need roughly one server per 25 guests, more if the trays are hot.",
        "Ratios tighten for a formal event, for wine service poured at the table, and for a room spread over several levels or a long walk from the kitchen."]],
      ["Bar",
       ["One bartender per 50 to 75 guests for beer and wine only, and one per 40 to 50 for a full bar. Add a barback once you pass roughly 150 guests, or once the bar is far from the ice and stock.",
        "A second, smaller bar usually cuts the queue faster than a second bartender at the same bar."]],
      ["Kitchen",
       ["Kitchen numbers depend on the menu rather than the guest count. A plated three-course dinner for 100 typically needs a chef plus three to four kitchen staff; the same 100 guests on a buffet might need a chef plus two.",
        "Add a dedicated dishwasher for any event using real china where the venue has no kitchen porter."]],
      ["The hours nobody counts",
       ["Staff hours are not the length of the party. Add loading and travel, one to three hours of setup, briefing, the service itself, then breakdown and pack-out, which is usually one to two hours.",
        "Overtime rules, minimum call-out hours and travel time between venues are the three things most often missing from a first quote. Put them in writing before they surprise anyone."]],
      ["Supervision",
       ["From about 75 guests, someone has to run the floor rather than serve on it. A captain or event lead keeps the timeline, talks to the venue and the client, and is the person the kitchen shouts at.",
        "Below that size the head chef or the owner usually does both jobs, which works until something goes wrong."]]
    ]
  },
  {
    slug: "drinks-planning",
    title: "Drinks planning",
    img: "drinks",
    lede: "Quantities for bar and table service, glassware, ice, and the non-alcoholic side that always runs short.",
    body: [
      ["The basic rate",
       ["The usual planning rate is one drink per guest for the first hour and one per guest per hour after that. A four-hour event for 100 adults therefore starts at roughly 400 to 500 drinks, before adjusting for the crowd.",
        "Shift that rate down for a lunch, a family event or a weekday corporate function, and up for an evening reception, a wedding, or any event with long gaps between courses."]],
      ["Bottles and servings",
       ["A 750 ml wine bottle pours about five glasses of 150 ml. A case of twelve bottles is therefore roughly 60 glasses. A 750 ml spirit bottle gives about 16 drinks at 45 ml.",
        "A common split for a mixed crowd is 50 percent wine, 30 percent beer and 20 percent spirits, with sparkling wine on top if there is a toast. Plan one glass of sparkling per guest for a toast, which is about six glasses per bottle."]],
      ["Ice, water and the soft side",
       ["Ice is the most under-ordered item at any event. Plan about 0.7 to 1 kilogram (1.5 to 2 pounds) per guest when ice is used for both chilling and drinks, and more in hot weather.",
        "Plan non-alcoholic drinks for at least 20 to 30 percent of adults, plus water for everyone throughout. A drinks list where the only interesting option contains alcohol is a planning mistake, not a style choice."]],
      ["Glassware",
       ["Order 1.5 to 2 glasses per guest per glass type for a self-service bar, because glasses are abandoned. Table-poured service needs fewer.",
        "Decide early whether glassware is rented washed or returned dirty; the difference shows up in both the rental invoice and the breakdown time."]],
      ["Licensing and responsibility",
       ["Serving alcohol is regulated almost everywhere, and the rules differ by country, state and venue. Check who holds the licence, who is legally responsible for refusing service, and what the venue's own policy is before the quote goes out.",
        "This page is a planning aid, not legal advice. Local law wins over any figure here."]]
    ]
  },
  {
    slug: "contract-checklist",
    title: "Catering contract checklist",
    img: "contract",
    lede: "The clauses that decide who pays when something changes, and the ones most often left out.",
    body: [
      ["The basics",
       ["Names and legal entities of both parties, the event date, the venue address, the start and end times of service, and the guest count the price is based on. A contract that says only \"lunch for about 80\" is where disputes start."]],
      ["Money",
       ["Price per head and what it includes. Deposit amount and due date. Payment schedule and final balance date. Accepted payment methods. Taxes. Service charge and whether any of it reaches the staff as gratuity, which is a legal question in several countries.",
        "Overtime rate per staff member per hour, and how overtime is authorised on the day. This single line prevents most invoice arguments."]],
      ["Guest count",
       ["The date the final count is due, usually 7 to 14 days before. The guaranteed minimum that will be charged regardless. Whether the count can go up after the deadline, by how much, and at what price.",
        "Also state how vendor meals and child meals are counted, since they are usually priced differently."]],
      ["Food and service",
       ["The agreed menu, or the date the menu is locked. Service style. Tasting: included or charged, and for how many people. Dietary and allergen handling. Who supplies and washes linen, china, glassware and flatware. Cake cutting, corkage and any venue fee.",
        "Leftovers: who owns them, and whether food safety rules allow them to leave the venue."]],
      ["Logistics and risk",
       ["Load-in and load-out times. Parking and access. Power, water and kitchen facilities at the venue, and what the caterer must bring. Setup and breakdown responsibilities.",
        "Insurance, including public liability and the certificate the venue usually demands. Licences held. Damage and loss of rented equipment."]],
      ["When things change",
       ["Cancellation terms with dates and refund percentages. Postponement terms, which are not the same thing, and whether the deposit moves to a new date. Force majeure, defined with examples rather than left vague. Substitution rights if an ingredient is unavailable. Who may make changes on the day, named as a person, not a role.",
        "This is a checklist for a conversation with a caterer, not a legal template. Contracts should be reviewed by someone qualified in your jurisdiction."]]
    ]
  },
  {
    slug: "event-timeline",
    title: "Planning timeline",
    img: "timeline",
    lede: "A working backwards schedule, from booking to the last van leaving.",
    body: [
      ["Three to six months out",
       ["Fix the date, the venue and a rough guest count. Get quotes from two or three caterers and check whether the venue has an approved supplier list, because that can end the conversation early.",
        "Ask each caterer what the price includes and what it excludes. The exclusions are where quotes differ."]],
      ["Two to three months out",
       ["Book the caterer and pay the deposit. Do the tasting. Agree the service style, since it drives staffing and rentals. Confirm the venue's kitchen facilities, power and access in writing."]],
      ["One month out",
       ["Lock the menu. Confirm rentals: tables, chairs, linen, china, glassware, flatware, chafing dishes, bars. Share the floor plan with the caterer. Collect dietary requirements with the invitations rather than chasing them later."]],
      ["Two weeks out",
       ["Give the final guest count, or whatever count the contract requires. Confirm the run sheet: arrival, canapes, speeches, service times, cake, bar close. Send the caterer the contact details of the venue manager and the person in charge on the day."]],
      ["The week of",
       ["Confirm delivery and load-in times with the venue. Check the weather plan if anything is outdoors, including a wet-weather deadline and who makes that call. Reconfirm headcount changes, staff numbers and the finish time."]],
      ["On the day",
       ["Setup usually starts two to four hours before guests arrive, longer if the kitchen is being built from scratch. Brief the staff on the timeline, the dietary flags and who the decision maker is.",
        "Plan breakdown as carefully as setup. Rentals have collection windows, venues have curfews, and the last hour is when damage and losses happen."]]
    ]
  },
  {
    slug: "rentals-checklist",
    title: "Rentals and equipment",
    img: "rentals",
    lede: "What gets rented for an off-site event, in the order people forget it.",
    body: [
      ["Tables and seating",
       ["Guest tables, head table, cake table, gift table, buffet or station tables, bar tables, and back-of-house prep tables. Chairs, plus a few spares.",
        "Round tables of 150 cm (60 inches) seat eight comfortably and ten tightly. Long trestle tables of 180 cm (6 feet) seat six to eight. Buffet tables need clearance on both sides if staff work behind them."]],
      ["Table settings",
       ["China, flatware and glassware by course, plus 10 to 15 percent spares for breakage and replating. Linen for every table, including the back-of-house ones, and napkins.",
        "Count glassware by type: water, wine, sparkling, cocktail. This is where orders are most often short."]],
      ["Kitchen and service",
       ["Chafing dishes and fuel, hot boxes, cambros, serving platters and utensils, cutting boards, knives, trash bins and liners, ice bins and tubs, coffee urns, water stations.",
        "If the venue has no commercial kitchen: ovens, burners, refrigeration, prep tables, handwashing station, and a plan for greywater."]],
      ["Infrastructure",
       ["Power distribution and cables, generator if needed, lighting for the buffet and the back of house, heating or fans, tent and flooring, and covered walkways between the kitchen area and the guests.",
        "Ask the venue for a power plan in amps rather than sockets. Chafers, coffee urns and refrigeration trip breakers when they share a circuit."]],
      ["Before you sign the rental order",
       ["Check delivery and collection windows, who unloads, whether items arrive clean and must be returned clean, replacement charges for losses, and where everything will be stacked at the end of the night.",
        "Walk the venue once with the rental list in hand. Doors, lifts and stairs decide what actually fits."]]
    ]
  },
  {
    slug: "dietary-requirements",
    title: "Dietary requirements and allergens",
    img: "dietary",
    lede: "Collecting requirements, planning for them, and the difference between a preference and a medical risk.",
    body: [
      ["Collect them early",
       ["Ask for dietary requirements on the invitation or the booking form, not in the last week. Ask an open question rather than offering tick boxes only, because the box you did not print is the one that matters.",
        "Keep a list by name and seat, not just a total. The kitchen needs to know which plate goes where."]],
      ["Preference, intolerance, allergy",
       ["A preference can be handled with a good alternative. An intolerance means the ingredient must be absent from the dish. An allergy means the ingredient must not touch the dish at any point, including shared utensils, fryers and surfaces.",
        "Coeliac disease and severe nut, shellfish, sesame or dairy allergies are medical conditions. Cross-contact is the risk, not just the recipe."]],
      ["Planning a menu that copes",
       ["The efficient approach is a main menu that is naturally free of as many common allergens as possible, with clearly labelled additions, rather than a separate special plate for every guest.",
        "Aim for at least one substantial vegetarian and one vegan option that a guest would choose on purpose. A plate of the side dishes is not a vegan main."]],
      ["On the day",
       ["Label buffet items with their allergens. Brief every server, not only the captain, on which dishes contain what. Plated special meals should be delivered by someone who knows who ordered them.",
        "Allergen labelling is regulated in many countries, and the rules for pre-packed and loose food differ. Check local requirements; nothing on this page replaces them."]]
    ]
  },
  {
    slug: "space-and-seating",
    title: "Space and seating",
    img: "space",
    lede: "How much room a guest actually needs, and how to lay out a room that flows.",
    body: [
      ["Space per guest",
       ["Conventional planning allowances, including circulation: about 1.0 to 1.2 square metres (11 to 13 square feet) per guest for a standing reception, 1.5 to 1.9 (16 to 20) for a seated buffet, and 1.9 to 2.3 (20 to 25) for a seated banquet with round tables.",
        "A dance floor is extra, usually planned at 0.4 to 0.5 square metres (4 to 5 square feet) per dancing guest, on the assumption that a third to a half of the room dances at once."]],
      ["Tables",
       ["Round tables of 150 cm (60 inches) seat eight to ten. Round tables of 180 cm (72 inches) seat ten to twelve. Long tables give each guest about 60 cm (24 inches) of edge.",
        "Leave at least 150 cm (5 feet) between tables so that chairs can push back and servers can pass. Anything less turns service into a squeeze and slows the meal."]],
      ["Flow",
       ["Keep the bar away from the entrance, or the first queue blocks the door. Put buffets where guests can approach from both ends, with the plates at the start and the sauces and cutlery at the end, so the queue does not stall.",
        "Give the kitchen a clear route to the room that does not cross the dance floor or the main guest path."]],
      ["Back of house",
       ["Plan a working area out of sight for plating, stacking dirty china, storing boxes and parking crates. A rough allowance is 10 to 15 percent of the guest floor area.",
        "If the venue offers nothing, that area still exists. It just ends up somewhere visible."]]
    ]
  }
];

const tools = [
  { slug: "food-quantity-calculator", title: "Food quantity calculator", img: "quantities",
    lede: "Estimate total food quantities from guest count, service style and event length." },
  { slug: "staffing-calculator", title: "Staffing calculator", img: "staffing",
    lede: "Estimate servers, bartenders and kitchen staff, and the hours to budget for." },
  { slug: "drinks-calculator", title: "Drinks calculator", img: "drinks",
    lede: "Estimate drinks, bottles, ice and glassware for the length of your event." },
  { slug: "cost-per-head-calculator", title: "Cost per head calculator", img: "budget",
    lede: "Work out the cost per guest from food, labour, rentals and overhead, and see the margin." }
];

module.exports = { guides, tools };
