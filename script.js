document.addEventListener('DOMContentLoaded', () => {
    const cabinGrid = document.getElementById('cabin-grid');
    if (!cabinGrid) return;

    for (let i = 1; i <= 20; i++) {
        const seatNum = i;
        const seatCard = document.createElement('div');
        seatCard.className = "bg-white border border-brand-border rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-brand-black transition-all shadow-sm";
        seatCard.setAttribute('data-seat', seatNum);
        seatCard.setAttribute('data-occupied', 'false');
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

    const editPassenger = document.getElementById('edit-passenger');
    const editName = document.getElementById('edit-name');
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


    editPassenger.addEventListener('change', () => {
        const seatId = editPassenger.value;
        if (!seatId) {
            editName.value = '';
            return;
        }
        const seatCard = document.querySelector(`[data-seat="${seatId}"]`);
        if (seatCard) {
            const nameSpan = seatCard.querySelector('span:nth-child(3)');
            if (nameSpan) {
                editName.value = nameSpan.textContent;
            }
        }
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
            alert("Seat Already Reserved");
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
            editPassenger.appendChild(option);

            const tr = document.createElement('tr');
            tr.setAttribute('data-passenger-seat', selectedSeatId);
            tr.innerHTML = `
                <td class="px-4 py-2.5 rounded-l-lg">${passengerName}</td>
                <td class="px-4 py-2.5">Siège ${selectedSeatId}</td>
                <td class="px-4 py-2.5">80 DH </td>
                <td class="px-4 py-2.5 rounded-r-lg text-right">Actions</td>
            `;
            passengerTableBody.prepend(tr);
        }

        formReserver.reset();
    });


    formEdit.addEventListener('submit', (e) => {
        e.preventDefault();

        const oldSeatId = editPassenger.value;
        const newName = editName.value.trim();
        const newSeatId = editSeat.value;

        if (!oldSeatId) {
            alert("Veuillez sélectionner un passager.");
            return;
        }

        if (!newName) {
            alert("Veuillez entrer un nouveau nom.");
            return;
        }

        let targetSeatId = oldSeatId;

        if (newSeatId !== "" && newSeatId !== oldSeatId) {
            const newSeatCard = document.querySelector(`[data-seat="${newSeatId}"]`);

            if (newSeatCard.getAttribute('data-occupied') === "true") {
                alert("Le nouveau siège sélectionné est déjà occupé.");
                return;
            }

            const oldSeatCard = document.querySelector(`[data-seat="${oldSeatId}"]`);
            oldSeatCard.className = "bg-white border border-brand-border rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-brand-black transition-all shadow-sm";
            oldSeatCard.setAttribute('data-occupied', 'false');
            oldSeatCard.innerHTML = `
                <i class="fa-solid fa-chair text-brand-body text-lg"></i>
                <span class="text-xs font-bold">Siège ${oldSeatId}</span>
                <span class="bg-brand-soft text-[10px] font-semibold text-brand-body px-2 py-0.5 rounded-full">Libre</span>
            `;

            targetSeatId = newSeatId;
        }

        const targetSeatCard = document.querySelector(`[data-seat="${targetSeatId}"]`);
        targetSeatCard.className = "bg-brand-black text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all shadow-sm";
        targetSeatCard.setAttribute('data-occupied', 'true');
        targetSeatCard.innerHTML = `
            <i class="fa-solid fa-user text-lg"></i>
            <span class="text-xs font-bold">Siège ${targetSeatId}</span>
            <span class="bg-white/20 text-[10px] font-semibold px-2 py-0.5 rounded-full truncate max-w-[70px]">${newName}</span>
        `;

        const tableRow = document.querySelector(`tr[data-passenger-seat="${oldSeatId}"]`);
        if (tableRow) {
            tableRow.setAttribute('data-passenger-seat', targetSeatId);
            tableRow.innerHTML = `
                <td class="px-4 py-2.5 rounded-l-lg">${newName}</td>
                <td class="px-4 py-2.5">Siège ${targetSeatId}</td>
                <td class="px-4 py-2.5">80 DH </td>
                <td class="px-4 py-2.5 rounded-r-lg text-right">Actions</td>
            `;
        }

        const selectedOption = editPassenger.querySelector(`option[value="${oldSeatId}"]`);
        if (selectedOption) {
            selectedOption.value = targetSeatId;
            selectedOption.textContent = `${newName} (Siège ${targetSeatId})`;
        }

        formEdit.reset();
    });
});