let shipmentdetailsid
async function shipmentdetailsActive() {
    shipmentdetailsid = ''
    const form = document.querySelector('#shipmentdetailsform')
    const form2 = document.querySelector('#viewshipmentdetailsform')
    if(form.querySelector('#submit')) form.querySelector('#submit').addEventListener('click', shipmentdetailsFormSubmitHandler)
    if(form2.querySelector('#querySubmit')) form2.querySelector('#querySubmit').addEventListener('click', shipmentdetailsFormSubmitHandler)
    datasource = []
    await fetchshipmentdetails()
    // await getAllshipmentdetails(true)
    // await getAllUsers('useridlist', 'id')
}

async function fetchshipmentdetails(id) {
    // did('image1Frame1').src = '';
    // did('image1Frame2').src = '';
    // Show loading state using SweetAlert
    const loadingAlert = Swal.fire({
        title: 'Please wait...',
        text: 'Fetching shipmentdetails data, please wait.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    let form = document.querySelector('#viewshipmentdetailsform');
    let formData = new FormData(form);
    // formData.set('department', '');
    // formData.set('shipmentdetails', '');
    let queryParams = new URLSearchParams(formData).toString();

    if(!id)document.getElementById('tabledata').innerHTML = `<td colspan="100%" class="text-center opacity-70"> Loading... </td>`

    let request = await httpRequest2(`api/v1/courier/shipmentdetail?${queryParams ? `${queryParams}` : ''}${id ? `&id=${id}` : ''}`, null, document.querySelector('#viewrequisitionform #submit'), 'json', 'GET');
    swal.close(); // Close the loading alert once the request is complete
    if(!id)document.getElementById('tabledata').innerHTML = `<td colspan="100%" class="text-center opacity-70"> No Records Retrieved </td>`
    if(request.status) {
        if(!id){
            if(request.data.length) {
                datasource = request.data
                resolvePagination(datasource, onshipmentdetailsTableDataSignal);
            }
        } else {
            document.getElementsByClassName('updater')[0].click();
            shipmentdetailsid = request.data[0].id;
            did('image1Frame1').setAttribute('src', request.data[0].image1);
            did('image2Frame2').setAttribute('src', request.data[0].image2);
            populateData(request.data[0]);
        }
    } else {
        return notification('No records retrieved');
    }
}

async function removeshipmentdetails(id) {
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

            let request = await httpRequest2('api/v1/courier/shipmentdetail', id ? getparamm() : null, null, 'json', "POST");
            return request;
        },
        allowOutsideClick: () => !Swal.isLoading()
    });

    // Show notification based on the result
    if (confirmed.isConfirmed) {
        fetchshipmentdetails();
        return notification(confirmed.value.message);
    }
}


async function onshipmentdetailsTableDataSignal() {
    let rows = getSignaledDatasource().map((item, index) => `
    <tr>
        <td>${index + 1}</td>
        <td><img src="${item.image1}" alt="Image 1" style="max-width: 100px; max-height: 100px;"></td>
        <td><img src="${item.image2}" alt="Image 2" style="max-width: 100px; max-height: 100px;"></td>
        <td>${item.description}</td>
        <td>${item.quantity}</td>
        <td>${item.weight}</td>
        <td>${item.dimensions}</td>
        <td>${item.value}</td>
        <td>${item.currency}</td>
        <td class="flex items-center gap-3 ">
            <button title="Edit row entry" onclick="fetchshipmentdetails('${item.id}')" class="material-symbols-outlined h-8 w-8 rounded-full bg-primary-g text-xs text-white drop-shadow-md" style="font-size: 18px;">edit</button>
            <button title="Delete row entry" onclick="removeshipmentdetails('${item.id}')" class="material-symbols-outlined h-8 w-8 rounded-full bg-red-600 text-xs text-white drop-shadow-md" style="font-size: 18px;">delete</button>
        </td>
    </tr>`
    )
    .join('')
    injectPaginatatedTable(rows)
}

async function shipmentdetailsFormSubmitHandler() {
    if(!validateForm('shipmentdetailsform', getIdFromCls('comp'))) return notification('Please fill all required fields', 0)
    
    let payload = getFormData2(document.querySelector('#shipmentdetailsform'), shipmentdetailsid ? [['id', shipmentdetailsid]] : null);

    const confirmed = await Swal.fire({
        title: shipmentdetailsid ? 'Updating...' : 'Submitting...',
        text: 'Please wait while we submit your data.',
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: async () => {
            Swal.showLoading();
            let request = await httpRequest2('api/v1/courier/shipmentdetail', payload, document.querySelector('#shipmentdetailsform #submit'), 'json', 'POST');
            Swal.close();

            if (request.status) {
                notification('Success!', 1);
                const form = document.querySelector('#shipmentdetailsform');
                form.reset();
                if(shipmentdetailsid)form.querySelectorAll('input, select, textarea').forEach(input => input.value = '');
                shipmentdetailsid = '';
                document.getElementsByClassName('viewer')[0].click();
                fetchshipmentdetails();
                did('image1Frame1').src = '';
                did('image1Frame2').src = '';
            } else {    
                notification(request.message, 0);
            }
        }
    });
}
