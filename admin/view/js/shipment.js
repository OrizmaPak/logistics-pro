let shipmentid;
async function shipmentActive() {
    shipmentid = '';
    const form = document.querySelector('#shipmentform');
    const form2 = document.querySelector('#viewshipmentform');
    if (form.querySelector('#submit')) {
        form.querySelector('#submit').addEventListener('click', shipmentFormSubmitHandler);
    }
    if (form2.querySelector('#querySubmit')) {
        form2.querySelector('#querySubmit').addEventListener('click', e=>fetchshipment());
    }
    datasource = [];
     getAllPackages();
     await fetchshipment()
}

async function getAllPackages() {
    try {
        const request = await httpRequest2(`api/v1/courier/shipmentdetail`, null, null, 'json', 'GET');
        if (request.status) {
            const data = request.data;
            if (data.length > 0) {
                const options = data.map(item => ({
                    value: item.id,
                    image1: item.image1 || '',
                    text: item.description
                }));
                initializeTomSelect(options);
            }
        }
    } catch (error) {
        console.error('Error fetching packages:', error);
    }
}

async function initializeTomSelect(options) {
    await new TomSelect('#shipmentdetailss', {
        plugins: ['remove_button', 'dropdown_input'],
        options: options,
        render: {
            option: (data, escape) => 
                `<div style="display: flex; align-items: center;"><img src="${escape(data.image1)}" alt="Image" style="width: 50px; height: 50px; margin-right: 10px;">${escape(data.text)}</div>`,
            item: (data, escape) => 
                `<div style="display: flex; align-items: center;"><img src="${escape(data.image1)}" alt="Image" style="width: 50px; height: 50px; margin-right: 10px;">${escape(data.text)}</div>`
        }
    });
}

async function fetchshipment(id) {

    // Show loading state using SweetAlert
    const loadingAlert = Swal.fire({
        title: 'Please wait...',
        text: 'Fetching shipment data, please wait.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    let form = document.querySelector('#viewshipmentform');
    let formData = new FormData(form);
    // formData.set('department', '');
    // formData.set('shipment', '');
    let queryParams = new URLSearchParams(formData).toString();

    if(!id)document.getElementById('tabledata').innerHTML = `<td colspan="100%" class="text-center opacity-70"> Loading... </td>`

    let request = await httpRequest2(`api/v1/courier/shipment?${queryParams ? `${queryParams}` : ''}${id ? `&id=${id}` : ''}`, null, document.querySelector('#viewrequisitionform #submit'), 'json', 'GET');
    swal.close(); // Close the loading alert once the request is complete
    if(!id)document.getElementById('tabledata').innerHTML = `<td colspan="100%" class="text-center opacity-70"> No Records Retrieved </td>`
    if(request.status) {
        if(!id){
            if(request.data.length) {
                datasource = request.data
                resolvePagination(datasource, onshipmentTableDataSignal);
            }
        } else {
            document.getElementsByClassName('updater')[0].click();
            shipmentid = request.data[0].id;
            populateData(request.data[0]);
            console.log(request.data[0].image)
            if(request.data[0].image)did('imageFrame').src = `${request.data[0].image}`;
            did('shipmentdetailss').tomselect.setValue(request.data[0].shipmentdetails.split('||'));
        }
    } else {
        return notification('No records retrieved');
    }
}

async function removeshipment(id) {
    // Ask for confirmation using SweetAlert with async and loader
    const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            function getparamm() {
                let paramstr = new FormData();
                paramstr.append('id', id);
                paramstr.append('status', 'DELETED');
                return paramstr;
            }

            let request = await httpRequest2('api/v1/courier/shipment', id ? getparamm() : null, null, 'json', "POST");
            return request;
        },
        allowOutsideClick: () => !Swal.isLoading()
    });

    // Show notification based on the result
    if (confirmed.isConfirmed) {
        fetchshipment();
        return notification(confirmed.value.message);
    }
}

async function removeshipmenttrack(id, shipmentId) {
    // Ask for confirmation using SweetAlert with async and loader
    const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            function getparamm() {
                let paramstr = new FormData();
                paramstr.append('id', id);
                paramstr.append('status', 'DELETED');
                return paramstr;
            }

            let request = await httpRequest2('api/v1/courier/tracking', id ? getparamm() : null, null, 'json', "POST");
            return request;
        },
        allowOutsideClick: () => !Swal.isLoading()
    });

    // Show notification based on the result
    if (confirmed.isConfirmed) {
        openTrackShipmentModal(shipmentId);
        return notification(confirmed.value.message);
    }
}

async function duplicateshipment(id) {
    // Ask for confirmation using SweetAlert with async and loader
    const confirmed = await Swal.fire({
        title: 'Duplicate Shipment',
        text: "Are you sure you want to duplicate this shipment?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, duplicate it!',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            function getparamm() {
                let paramstr = new FormData();
                paramstr.append('id', id);
                return paramstr;
            }

            let request = await httpRequest2('api/v1/courier/clone', id ? getparamm() : null, null, 'json', "POST");
            return request;
        },
        allowOutsideClick: () => !Swal.isLoading()
    });

    // Show notification based on the result
    if (confirmed.isConfirmed) {
        fetchshipment();
        return notification(confirmed.value.message);
    }
}


async function onshipmentTableDataSignal() {
    let rows = getSignaledDatasource().map((item, index) => `
    <tr>
        <td>${index + 1}</td>
        <td>${formatDate(item.dateadded)}</td>
        <td>${item.shipmentid}</td>
        <td>${item.sendername}</td>
        <td>${item.receivername}</td>
        <td>${item.shipmentdetails.length}</td>
        <td>${item.status}</td>
        <td class="flex items-center gap-3 ">
            <button title="Track Shipment" onclick="openTrackShipmentModal('${item.id}')" class="material-symbols-outlined h-8 w-8 rounded-full bg-orange-600 text-xs text-white drop-shadow-md" style="font-size: 18px;">share_location</button>
            <button title="View full details" onclick="viewShipmentDetails('${item.id}')" class="material-symbols-outlined h-8 w-8 rounded-full bg-green-600 text-xs text-white drop-shadow-md" style="font-size: 18px;">visibility</button>
            <button title="Edit row entry" onclick="fetchshipment('${item.id}')" class="material-symbols-outlined h-8 w-8 rounded-full bg-primary-g text-xs text-white drop-shadow-md" style="font-size: 18px;">edit</button>
            <button title="Duplicate row entry" onclick="duplicateshipment('${item.id}')" class="material-symbols-outlined h-8 w-8 rounded-full bg-gray-600 text-xs text-white drop-shadow-md" style="font-size: 18px;">control_point_duplicate</button>
            <button title="Delete row entry" onclick="removeshipment('${item.id}')" class="material-symbols-outlined  h-8 w-8 rounded-full bg-red-600 text-xs text-white drop-shadow-md" style="font-size: 18px;">delete</button>
        </td>
    </tr>`
    )
    .join('')
    injectPaginatatedTable(rows)
}

async function openTrackShipmentModal(shipmentId, editid=null) {
    // Show loading state using SweetAlert
    const loadingAlert = Swal.fire({
        title: 'Please wait...',
        text: 'Fetching tracking data, please wait.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // Fetch existing tracking data
    let trackingData = await httpRequest2(`api/v1/courier/tracking?shipmentid=${shipmentId}`, null, null, 'json', 'GET');
    Swal.close(); // Close the loading alert once the request is complete

    await Swal.fire({
        title: editid ? 'Edit Tracking Data' : 'Track Shipment',
        width: '80%', // Make the modal bigger
        html: `
            <section class="animate__animated animate__fadeIn relative">
                <form id="trackShipmentForm" class="flex flex-col space-y-3 rounded-sm bg-white/90 p-5 xl:p-10">
                    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div class="form-group">
                            <label for="trackingdatetime" class="control-label text-left">Tracking Date & Time</label>
                            <input type="datetime-local" id="trackingdatetime" name="trackingdatetime" class="form-control" placeholder="Select tracking date and time">
                        </div>
                        <div class="form-group">
                            <label for="quote" class="control-label text-left">Currency</label>
                            <input type="text" value="USD" id="currency" name="currency" class="form-control" placeholder="Enter quote">
                        </div>
                        </div>
                        <div class="form-group">
                            <label for="location" class="control-label text-left">Location</label>
                            <input type="text" id="location" name="location" class="form-control" placeholder="Enter location">
                        </div>
                        <div class="form-group">
                            <label for="message" class="control-label text-left">Message</label>
                            <textarea id="message" name="message" class="form-control" placeholder="Enter message"></textarea>
                        </div>
                        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div class="form-group">
                                <label for="trackingstatus" class="control-label text-left">Tracking Status</label>
                                <select id="trackingstatus" name="trackingstatus" class="form-control">
                                    <option value="PENDING">PENDING</option>
                                    <option value="PAID">PAID</option>
                                    <option value="DELAYED">DELAYED</option>
                                    <option value="DELIVERED">DELIVERED</option>
                                    <option value="PASSED">PASSED</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="quote" class="control-label text-left">Quote</label>
                                <input type="number" id="quote" name="quote" class="form-control" placeholder="Enter quote">
                            </div>
                        </div>
                        
                    </div>
                    <div class="flex justify-end mt-6">
                        <button id="submittracking" type="button" class="btn">
                            <div class="btnloader" style="display: none"></div>
                            <span>${editid ? 'Update' : 'Submit'}</span>
                        </button>
                    </div>
                </form>
                <div class="table-content mt-4">
                    <table class="table-auto">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tracking Date</th>
                                <th>Tracking Status</th>
                                <th>Location</th>
                                <th>currency</th>
                                <th>Quote</th>
                                <th>Message</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="trackingTableBody">
                            ${trackingData.data.map(item => `
                                <tr>
                                    <td>${item.id}</td>
                                    <td>${formatDate(item.trackingdate)}</td>
                                    <td>${item.trackingstatus}</td>
                                    <td>${item.location}</td>
                                    <td>${item.currency}</td>
                                    <td>${item.quote}</td>
                                    <td>${item.message}</td>
                                    <td class="flex items-center gap-3 ">
                                        <button onclick="openTrackShipmentModal('${shipmentId}', '${item.id}')" class="material-symbols-outlined h-8 w-8 rounded-full bg-primary-g text-xs text-white drop-shadow-md" style="font-size: 18px;">edit</button>
                                        <button onclick="removeshipmenttrack('${item.id}', '${shipmentId}')" class="material-symbols-outlined h-8 w-8 rounded-full bg-red-600 text-xs text-white drop-shadow-md" style="font-size: 18px;">delete</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </section>
        `,
        focusConfirm: false,
        didOpen: () => {
            if (editid) {
                const editItem = trackingData.data.find(item => item.id == editid);
                if (editItem) {
                    document.getElementById('trackingdatetime').value = new Date(editItem.trackingdate).toISOString().slice(0, 16);
                    document.getElementById('location').value = editItem.location;
                    document.getElementById('message').value = editItem.message;
                    document.getElementById('trackingstatus').value = editItem.trackingstatus;
                    document.getElementById('quote').value = editItem.quote;
                    document.getElementById('currency').value = editItem.currency;
                }
            }

            const submitButton = document.getElementById('submittracking');
            submitButton.addEventListener('click', async () => {
                if (!validateForm('trackShipmentForm', getIdFromCls('comp'))) {
                    return notification('Please fill all required fields', 0);
                }

                const formValues = {
                    message: document.getElementById('message').value,
                    location: document.getElementById('location').value,
                    trackingstatus: document.getElementById('trackingstatus').value,
                    quote: document.getElementById('quote').value,
                    trackingdate: document.getElementById('trackingdatetime').value
                };

                // Handle form submission and update the tracking table
                let payload = new FormData();
                payload.append('shipmentid', shipmentId);
                payload.append('message', formValues.message);
                payload.append('location', formValues.location);
                payload.append('trackingstatus', formValues.trackingstatus);
                payload.append('quote', formValues.quote);
                payload.append('trackingdate', formValues.trackingdate);
                if(editid)payload.append('id', editid);

                let response = await httpRequest2('api/v1/courier/tracking', payload, did('submittracking'), 'json', 'POST');
                if (response.status) {
                    notification('Tracking data updated successfully!', 1);
                    openTrackShipmentModal(shipmentId); // Refresh modal with updated data
                } else {
                    notification('Failed to update tracking data.', 0);
                }
            });
        }
    });
}

function viewShipmentDetails(id) {
    const item = datasource.find(item => item.id == id);
    if (item) {
        Swal.fire({
            title: `<span style="font-weight: 600; color: #2d3748;">Shipment #${item.shipmentid}</span>`,
            html: `
                <div class="modern-modal">
                    <!-- Header Section -->
                    <div class="modal-header">
                        <div class="status-pill ${item.status.toLowerCase()}">${item.status}</div>
                        <div class="metadata">
                            <div class="meta-item">
                                <i class="fas fa-calendar-alt meta-icon"></i>
                                ${item.dateadded}
                            </div>
                        </div>
                    </div>

                    <!-- Main Content -->
                    <div class="modal-content">
                        <!-- Sender & Receiver Cards -->
                        <div class="dual-column">
                            <div class="info-card">
                                <h3 class="card-title"><i class="fas fa-user-shield"></i> Sender</h3>
                                <div class="info-grid">
                                    ${infoField('Name', item.sendername)}
                                    ${infoField('Company', item.sendercompany)}
                                    ${infoField('Address', item.senderaddress)}
                                    ${infoField('City', item.sendercity)}
                                    ${infoField('State', item.senderstate)}
                                    ${infoField('Country', item.sendercountry)}
                                    ${infoField('Postal Code', item.senderpostalcode)}
                                    ${infoField('Contact', item.sendertelephone, 'phone')}
                                    ${infoField('Email', item.senderemail, 'email')}
                                </div>
                            </div>

                            <div class="info-card">
                                <h3 class="card-title"><i class="fas fa-user-check"></i> Receiver</h3>
                                <div class="info-grid">
                                    ${infoField('Name', item.receivername)}
                                    ${infoField('Company', item.receivercompany)}
                                    ${infoField('Address', item.receiveraddress)}
                                    ${infoField('City', item.receivercity)}
                                    ${infoField('State', item.receiverstate)}
                                    ${infoField('Country', item.receivercountry)}
                                    ${infoField('Postal Code', item.receiverpostalcode)}
                                    ${infoField('Contact', item.receivertelephone, 'phone')}
                                    ${infoField('Email', item.receiveremail, 'email')}
                                </div>
                            </div>
                        </div>

                        <!-- Shipment Image -->
                        <div class="image-card">
                            <h3 class="card-title"><i class="fas fa-camera"></i> Shipment Image</h3>
                            <div class="main-image-container">
                                <img src="${item.image}" alt="Shipment" class="main-image" 
                                     onerror="this.src='placeholder-image.jpg'">
                            </div>
                        </div>

                        <!-- Package Details -->
                        <div class="packages-section">
                            <h3 class="section-title"><i class="fas fa-box-open"></i> Package Details</h3>
                            ${item.shipmentdetails.map(detail => `
                                <div class="package-card">
                                    <div class="package-header">
                                        <span class="package-desc">${detail.description}</span>
                                        <div class="package-meta">
                                            <span class="meta-badge">${detail.quantity} units</span>
                                            <span class="meta-badge">${detail.weight}</span>
                                            <span class="meta-badge">${detail.dimensions}</span>
                                            <span class="meta-badge highlight">${detail.value}</span>
                                        </div>
                                    </div>
                                    <div class="image-gallery">
                                        <img src="${detail.image1}" alt="Detail 1" class="gallery-image">
                                        <img src="${detail.image2}" alt="Detail 2" class="gallery-image">
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <style>
                .modern-modal {
                    font-family: 'Segoe UI', system-ui, sans-serif;
                    color: #4a5568;
                }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #e2e8f0;
                }

                .status-pill {
                    padding: 0.35rem 1rem;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    text-transform: capitalize;
                }

                .status-pill.pending { background: #fff3cd; color: #856404; }
                .status-pill.shipped { background: #cce5ff; color: #004085; }
                .status-pill.delivered { background: #d4edda; color: #155724; }

                .metadata {
                    display: flex;
                    gap: 1.5rem;
                    color: #718096;
                    font-size: 0.9rem;
                }

                .meta-icon {
                    margin-right: 0.5rem;
                    color: #a0aec0;
                }

                .dual-column {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .info-card {
                    background: white;
                    border-radius: 0.75rem;
                    padding: 1.25rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                    border: 1px solid #edf2f7;
                }

                .card-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin: 0 0 1rem 0;
                    color: #2d3748;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 0.75rem;
                }

                .info-field {
                    font-size: 0.9rem;
                }

                .info-field strong {
                    display: block;
                    color: #718096;
                    font-weight: 500;
                    margin-bottom: 0.25rem;
                }

                .image-card {
                    background: white;
                    border-radius: 0.75rem;
                    padding: 1.25rem;
                    margin-bottom: 1.5rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                }

                .main-image-container {
                    border-radius: 0.5rem;
                    overflow: hidden;
                    border: 1px solid #e2e8f0;
                }

                .main-image {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    transition: transform 0.2s ease;
                }

                .packages-section {
                    background: white;
                    border-radius: 0.75rem;
                    padding: 1.25rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                }

                .package-card {
                    border: 1px solid #edf2f7;
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin-bottom: 1rem;
                }

                .package-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.75rem;
                }

                .package-desc {
                    font-weight: 500;
                    color: #2d3748;
                }

                .package-meta {
                    display: flex;
                    gap: 0.5rem;
                }

                .meta-badge {
                    background: #f7fafc;
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.8rem;
                    border: 1px solid #e2e8f0;
                }

                .meta-badge.highlight {
                    background: #ebf8ff;
                    color: #3182ce;
                    border-color: #bee3f8;
                }

                .image-gallery {
                    display: flex;
                    gap: 1rem;
                    margin-top: 0.75rem;
                }

                .gallery-image {
                    width: 120px;
                    height: 90px;
                    border-radius: 0.25rem;
                    object-fit: cover;
                    border: 1px solid #e2e8f0;
                    transition: all 0.2s ease;
                    cursor: pointer;
                }

                .gallery-image:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                }
                </style>
            `,
            width: 900,
            padding: '1.5rem',
            background: '#f8fafc',
            showConfirmButton: false,
            backdrop: 'rgba(0,0,0,0.28)',
            customClass: {
                popup: 'modern-swal-popup'
            }
        });
    }
}

// Helper function to create info fields
function infoField(label, value, type = 'text') {
    if (!value) return '';
    const formattedValue = type === 'email' 
        ? `<a href="mailto:${value}" class="email-link">${value}</a>`
        : type === 'phone'
        ? `<a href="tel:${value}">${value}</a>`
        : value;
    
    return `
        <div class="info-field">
            <strong>${label}</strong>
            <span>${formattedValue}</span>
        </div>
    `;
}

async function shipmentFormSubmitHandler() {
    if(!validateForm('shipmentform', getIdFromCls('comp'))) return notification('Please fill all required fields', 0)
    
    let payload = getFormData2(document.querySelector('#shipmentform'), 
    shipmentid ? 
    [['id', shipmentid], ['shipmentdetails', did('shipmentdetailss').tomselect.getValue().toString().replaceAll(',', '||')]]
    : 
    [['shipmentdetails', did('shipmentdetailss').tomselect.getValue().toString().replaceAll(',', '||')]]
    );

    const confirmed = await Swal.fire({
        title: shipmentid ? 'Updating...' : 'Submitting...',
        text: 'Please wait while we submit your data.',
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: async () => {
            Swal.showLoading();
            let request = await httpRequest2('api/v1/courier/shipment', payload, document.querySelector('#shipmentform #submit'), 'json', 'POST');
            Swal.close();

            if (request.status) {
                notification('Success!', 1);
                const form = document.querySelector('#shipmentform');
                form.reset();
                if(shipmentid)form.querySelectorAll('input, select, textarea').forEach(input => input.value = '');
                shipmentid = '';
                document.getElementsByClassName('viewer')[0].click();
                fetchshipment();
            } else {    
                notification(request.message, 0);
            }
        }
    });
}
