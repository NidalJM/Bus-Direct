document.addEventListener('DOMContentLoaded', () => {
    const cabinGrid = document.getElementById('cabin-grid');
    if (!cabinGrid) return;
    for (let i = 1; i <= 20; i++) {
        const seatNum = i;
        const seatCard = document.createElement('div');
        seatCard.className = "bg-white border border-brand-border rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-brand-black transition-all shadow-sm";
        seatCard.setAttribute('data-seat', seatNum);
        seatCard.innerHTML = `
            <i class="fa-solid fa-chair text-brand-body text-lg"></i>
            <span class="text-xs font-bold">Siège ${seatNum}</span>
            <span class="bg-brand-soft text-[10px] font-semibold text-brand-body px-2 py-0.5 rounded-full">Libre</span>
        `;
        cabinGrid.appendChild(seatCard);
        if (i % 4 === 2) {
            const aisleSpacer = document.createElement('div');
            cabinGrid.appendChild(aisleSpacer);
        }
    }

    // Tabs
    const tabReserver = document.getElementById('tab-reserve');
    const tabEdit = document.getElementById('tab-edit');
    const tabCancel = document.getElementById('tab-cancel');

    //Forms
    const formReserver = document.getElementById('form-reserve');
    const formEdit = document.getElementById('form-edit');
    const formCancel = document.getElementById('form-cancel');

    function hideForms() {
        formReserver.classList.add('hidden');
        formEdit.classList.add('hidden');
        formCancel.classList.add('hidden');

        [tabReserver, tabEdit, tabCancel].forEach(tab => {
            tab.className = "flex-1 py-2 text-sm font-medium rounded-full text-brand-body transition-all";
        })
    }

    tabReserver.addEventListener('click', () => {
        hideForms();
        formReserver.classList.remove('hidden');
        tabReserver.className = "flex-1 py-2 text-sm font-medium rounded-full bg-brand-black text-white transition-all";
    })

    tabEdit.addEventListener('click', () => {
        hideForms();
        formEdit.classList.remove('hidden');
        tabEdit.className = "flex-1 py-2 text-sm font-medium rounded-full bg-brand-black text-white transition-all";
    })

    tabCancel.addEventListener('click', () => {
        hideForms();
        formCancel.classList.remove('hidden');
        tabCancel.className = "flex-1 py-2 text-sm font-medium rounded-full bg-brand-black text-white transition-all";
    })

});

