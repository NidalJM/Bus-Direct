document.addEventListener('DOMContentLoaded', () => {
    const cabinGrid = document.getElementById('cabin-grid');
    if (!cabinGrid) return;

    for (let i = 1; i <= 20; i++) {
        const seatNum = i;
        const seatCard = document.createElement('div');
        seatCard.className = "bg-white border border-brand-border rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-brand-black transition-all shadow-sm";
        seatCard.setAttribute('data-seat', seatNum);
        seatCard.setAttribute('data-occupied', 'false')
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

    //Tabs

    const tabReserver = document.getElementById('tab-reserve');
    const tabEdit = document.getElementById('tab-edit');
    const tabCancel = document.getElementById('tab-cancel');

    const passengerTableBody = document.getElementById('passenger-table-body');

    //Forms

    const formReserver = document.getElementById('form-reserve');
    const formEdit = document.getElementById('form-edit');
    const formCancel = document.getElementById('form-cancel');

    //Inputs

    const reserveName = document.getElementById('reserve-name');
    const reserveSeat = document.getElementById('reserve-seat');
    const editName = document.getElementById('edit-passenger');
    const editSeat = document.getElementById('edit-seat');

    for (let i = 1; i <= 20; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Siège ${i}`;
        reserveSeat.appendChild(option);
    }

        for (let i = 1; i <= 20; i++) {
        const optionEdit = document.createElement('option');
        optionEdit.value = i;
        optionEdit.textContent = `Siège ${i}`;
        editSeat.appendChild(optionEdit);
    }

    function hideForms() {
        formReserver.classList.add('hidden');
        formEdit.classList.add('hidden');
        formCancel.classList.add('hidden');

        [tabReserver, tabEdit, tabCancel].forEach(tab => {
            tab.className = "flex-1 py-2 text-sm font-medium rounded-full text-brand-body transition-all";
        });
    }

    tabReserver.addEventListener('click', () => {
        hideForms();
        formReserver.classList.remove('hidden');
        tabReserver.className = "flex-1 py-2 text-sm font-medium rounded-full bg-brand-black text-white transition-all";
        
    });

    tabEdit.addEventListener('click', () => {
        hideForms();
        formEdit.classList.remove('hidden');
        tabEdit.className = "flex-1 py-2 text-sm font-medium rounded-full bg-brand-black text-white transition-all";
    });

    tabCancel.addEventListener('click', () => {
        hideForms();
        formCancel.classList.remove('hidden');
        tabCancel.className = "flex-1 py-2 text-sm font-medium rounded-full bg-brand-black text-white transition-all";
    });


    formReserver.addEventListener('submit', (e) => {
        e.preventDefault();

        const passengerName = reserveName.value.trim();
        let selectedSeatId = reserveSeat.value;
        let seatCard = document.querySelector(`[data-seat="${selectedSeatId}"]`);

        if (!passengerName) {
            alert("Veuillez entrer le nom du passager.");
            return;
        }

        if (selectedSeatId === "") {
                seatCard = document.querySelector('[data-occupied="false"]');
                selectedSeatId = seatCard.getAttribute('data-seat');
        }

        if (seatCard.getAttribute('data-occupied') === "true") {
            alert("Seat Already Reserved")
            return;
        }

        if (seatCard) {
            seatCard.className = "bg-brand-black text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all shadow-sm";
            seatCard.setAttribute('data-occupied', 'true');
            seatCard.innerHTML = `
                <i class="fa-solid fa-user text-lg"></i>
                <span class="text-xs font-bold">Siège ${selectedSeatId}</span>
                <span class="bg-white/20 text-[10px] font-semibold px-2 py-0.5 rounded-full truncate max-w-[70px]">${passengerName}</span>
            `;


            const option = document.createElement('option');
            option.value = selectedSeatId;
            option.textContent = `${passengerName} (Siège ${selectedSeatId})`;
            editName.appendChild(option);


            const tr = document.createElement('tr');
            tr.setAttribute('data-passenger-seat', selectedSeatId);
            tr.innerHTML = `
                            <td class="px-4 py-2.5 rounded-l-lg">${passengerName}</td>
                            <td class="px-4 py-2.5">${selectedSeatId}</td>
                            <td class="px-4 py-2.5">80 DH </td>
                            <td class="px-4 py-2.5 rounded-r-lg text-right">Actions</td>
            `;
            passengerTableBody.prepend(tr)
        }

        formReserver.reset()
    });
});