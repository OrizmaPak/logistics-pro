  <ul class="flex text-sm font-medium hidden text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                                <!--<li id="rccview" class="me-2 cp viewer" onclick="did('guestsreservationsform').classList.add('hidden');this.children[0].classList.add('active', '!text-blue-600');did('lostandfoundview').classList.remove('hidden');this.nextElementSibling.children[0].classList.remove('active', '!text-blue-600');">-->
                                <li id="" class="me-2 cp viewer optioner !text-blue-600 active" name="paymentview" onclick="runoptioner(this)">
                                    <p class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 capitalize ">View Payment</p>
                                </li>
                                <li id="iddformform" class="me-2 cp updater optioner" name="paymentformdiv" onclick="runoptioner(this)">
                                    <p class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 capitalize">Payment</p>
                                </li>
                            </ul>
    <p class="page-title">
        <span>Payment</span>
    </p>

<div id="paymentformdiv" class="">
                        <form id="paymentform">
                                    <div class="flex flex-col space-y-3 bg-white/90 p-5 xl:p-10 rounded-sm">
                                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
                                            <div class="form-group">
                                                <label for="logoname" class="control-label">Pay to</label>
                                                <input type="text" id="paidto1" class="form-control comp" list="supplierlister" onchange="checkdatalist(this, 'paidto', 'supplierlisterid');handlesalesapplytopaymentbalance()" placeholder="Search by Item Name">
                                                <input type="text" name="paidto" id="paidto" class="form-control hidden" placeholder="Search by Item Name">
                                            </div>
                                            <div class="form-group">
                                                <label for="logoname" class="control-label">amount paid</label>
                                                <input type="number" name="amountpaid" id="amountpaid" class="form-control comp" placeholder="amount paid">
                                            </div>
                                        </div>
                                              <div class="px-7 lg:px-14 py-4 lg:py-8 bg-blue-400 text-white flex flex items-center">
                                         <div class="form-group ">
                                                <label for="logoname" class="control-label">Balance</label>
                                                <label id="bal" class="control-label text-bold text-xl">Nill</label>
                                                <input id="balance" name="balance" class="control-label text-bold text-xl hidden">
                                            </div>
                                    </div>
                        
                                        </div>
                                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                       <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div class="form-group">
                                                <label for="logoname" class="control-label text-md">payment method</label>
                                                <select name="paymentmethod" id="paymentmethod" class="bg-white form-control !p-2 comp">
                                                    <option value="">-- SELECT PAYMENT METHOD --</option>
                                                    <option>TRANSFER</option>
                                                    <option>CASH</option>
                                                    <option>POS</option>
                                                </select>
                                            </div>
                                            <div class="form-group"> 
                                                <label for="logoname" class="control-label">other detail</label>
                                                <input type="text" name="otherdetail" id="otherdetail" class="form-control" placeholder="Other details">
                                            </div>
                                        </div>
                                            <div class="form-group">
                                                <label for="logoname" class="control-label">Description</label>
                                                <textarea name="description" id="description" class="form-control" placeholder="Enter Description"></textarea>
                                            </div>
                                        </div>
                                        <div id="bankdetails"></div>
                                        <div>
                                </div> 
                                        
                                       
                            
                                    </div> 
                                 <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                            <datalist id="supplierlister"></datalist>
                                            <datalist id="supplierlisterid"></datalist>
                                            <datalist id="fetchglbyaccounttype"></datalist>
                                            <datalist id="fetchglbyaccounttypeaccountnumber"></datalist>
                                            <div></div>
                                            <div></div>
                                            
                                            <div class="flex justify-end mt-5">
                                                 <button id="submit" disabled type="button" class="btn">
                                                    <div class="btnloader" style="display: none;"></div>
                                                    <span>Submit</span>
                                                </button>
                                            </div>
                                            
                                        </div> 
                                </form>
                             
                                
                    </div>
                    
<div id="paymentview" class="hidden">
                        <form id="paymentformview" class="">
                                    <div class="flex flex-col space-y-3 bg-white/90 p-5 xl:p-10 rounded-sm">
                                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div class="form-group">
                                                <label for="logoname" class="control-label">Start Date</label>
                                                <input type="date" name="startdate" id="startdate" class="form-control" placeholder="Search by Item Name">
                                            </div>
                                            <div class="form-group">
                                                <label for="logoname" class="control-label">End Date</label>
                                                <input type="date" name="enddate" id="enddate" class="form-control" placeholder="Search by Item Name">
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                            
                                            <div></div>
                                            <div></div>
                                            
                                            <div class="flex justify-end mt-5">
                                                 <button id="submit1" type="button" class="btn">
                                                    <div class="btnloader" style="display: none;"></div>
                                                    <span>Submit</span>
                                                </button>
                                                <!-- <button id="submit" type="button" class="w-full md:w-max rounded-md text-white text-sm capitalize bg-gradient-to-tr from-blue-400 via-blue-500 to-primary-g px-8 py-3 lg:py-2 shadow-md font-medium hover:opacity-75 transition duration-300 ease-in-out flex items-center justify-center gap-3">-->
                                                <!--    <div class="btnloader" style="display: none;"></div>-->
                                                <!--    <span>Submit</span>-->
                                                <!--</button>-->
                                            </div>
                                            
                                        </div> 
                            
                                    </div>
                                </form>
                        <hr class="my-10">   
                        <div >
                                    <div class="table-content">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>s/n</th>
                                                    <th>t.date</th>
                                                    <th>Applyto</th>
                                                    <th>description</th>
                                                    <th>Total&nbsp;Amount</th>
                                                    <th>Amount&nbsp;paid</th>
                                                    <th>payment&nbsp;method</th>
                                                    <th>action</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tabledata">
                                               <tr>
                                                    <td colspan="100%" class="text-center opacity-70"> Table is empty</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="table-status"></div>
                                </div>      
                    </div>
                    
                    <div id="paymentmodal" onclick="if(event.target.id === 'paymentmodal')this.classList.add('hidden')" class="hidden w-full h-full bg-[#0000004a] fixed top-0 left-0 overflow-y-auto flex justify-center items-start">
                                <div class="w-fit max-w-[90%] mt-8 min-w-[500px] h-fit min-h-[400px] bg-white p-2 rounded-md shadow-lg flex flex-col items-center">
                                    
                                    <div class="w-full py-2 flex justify-between mx-8">
                                        <p id="modaltitle" class="text-md font-bold">payment REPORT</p>
                                        <div onclick="printDomContent('SALES REPORT', 'printer')" class="w-[100px] hover:scale-[1.3] transition-all flex justify-center mx-8 bg-white p-2 rounded bg-blue-400">
                                            <span class="cp material-symbols-outlined group-hover:text-primary-g scale-[1.5] text-white" style="font-size: 20px;">print</span>
                                        </div>
                                        <span onclick="document.getElementById('paymentmodal').classList.add('hidden')" class="cp material-symbols-outlined text-red-600 group-hover:text-primary-g"
                                           style="font-size: 20px;">close</span>
                                    </div>
                                    
                                    <hr class="mb-4"/>
                                    
                                    <div id="printer">
                                    
                                        <div id="modaldetails" class="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full border shadow max-w-[600px] p-6">
                                            
                                        <!-- <p class="!text-sm font-thin">Supplier: <span id="vrqsupplier" class="uppercase !text-sm font-semibold" style=""></span></p>-->
                                        <!--<p class="!text-sm font-thin">Transaction Time: <span class="!text-sm font-semibold" id="vrqtime" style="">  </span></p>-->
                                        <!--<p class="!text-sm font-thin">Transaction Date: <span class="!text-sm font-semibold" id="vrqdate" style=""> </span> </p>-->
                                        <!--<p class="!text-sm font-thin">Location: <span id="vrqlocation" class="uppercase !text-sm font-semibold" style=""></span></p>-->
                                        <!--<p class="!text-sm font-thin" style="marginLeft: 20px;">Description: <span id="vrqdesc" class="font-semibold" style=""></span> </p>-->
                                        <!--<p class="!text-sm font-thin">Invoice Number: <span id="vrqref" class="uppercase !text-sm font-semibold" style=""></span></p>-->
                                            
                                        </div>
                                        
                                        <div class="table-content my-4">
                                                <table>
                                                    <thead>
                                                        <tr id="tableheader">
                                                           <th>s/n </th>
                                                            <th> Item ID </th>
                                                            <th> Item Name </th>
                                                            <th> qty </th>
                                                            <th> PRICE </th>
                                                            <th> TOTAL </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tabledata2">
                                                       <tr>
                                                            <td colspan="100%" class="text-center opacity-70"> Table is empty</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                    
                                    </div>
                                    
                                </div>
                                
                            </div>
                        
                        
                          <div id="modalpayment" onclick="if(event.target.id == 'modalpayment')this.classList.add('hidden');did('payment').click()" class="!z-[100] w-screen h-screen fixed bg-[#5a5a5a3e] top-0 left-0 p-10 overflow-auto hidden">
                               
                               <div id="viewformtoeditpayment" class="animate__animated animate__fadeIn w-[80%] bg-white w-fit mx-auto relative p-10 rounded-lg shadow-lg">
                                   
                                   
                           <!--    <div class="flex flex-col justify-center items-center gap-2" >-->
                           <!--         <div>-->
                        			<!--	<div class="flex justify-end phide">-->
                        			<!--	<div onclick="printContent('HEMS posRECEIPT', null, 'sdklfjnll', true)" class="relative mr-4 inline-block">-->
                        			<!--		<div class="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center" >-->
                        			<!--			<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-printer" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">-->
                        			<!--				<rect x="0" y="0" width="24" height="24" stroke="none"></rect>-->
                        			<!--				<path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2"></path>-->
                        			<!--				<path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4"></path>-->
                        			<!--				<rect x="7" y="13" width="10" height="8" rx="2"></rect>-->
                        			<!--			</svg>				  -->
                        			<!--		</div>-->
                        			<!--		<div onclick="exportToPDF('sdklfjnll')" class="z-40 shadow-lg text-center w-32 block absolute right-0 top-0 p-2 mt-12 rounded-lg bg-gray-800 text-white text-xs" style="display: none;">-->
                        			<!--			Print this Invoice!-->
                        			<!--		</div>-->
                        			<!--	</div>-->
                        			<!--	<div onclick="printContent('HEMS INVOICE', null, 'sdklfjnll', true)" class="relative mr-4 inline-block">-->
                        			<!--		<div class="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center" onclick="printInvoice()">-->
                        			<!--			<span class="material-symbols-outlined">picture_as_pdf</span>			  -->
                        			<!--		</div>-->
                        			<!--		<div  class="z-40 shadow-lg text-center w-32 block absolute right-0 top-0 p-2 mt-12 rounded-lg bg-gray-800 text-white text-xs" style="display: none;">-->
                        			<!--			Print this Invoice!-->
                        			<!--		</div>-->
                        			<!--	</div>-->
                        			<!--	<div onclick="did('modalposreceipt').classList.add('hidden');did('posreceipt').click()" class="relative inline-block">-->
                        			<!--		<div class="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false" @click="printInvoice()">-->
                        			<!--			<span class="material-symbols-outlined text-red-500 cp-500">cancel</span>	  -->
                        			<!--		</div>-->
                        			<!--		<div x-show.transition="showTooltip" class="z-40 shadow-lg text-center w-32 block absolute right-0 top-0 p-2 mt-12 rounded-lg bg-gray-800 text-white text-xs" style="display: none;">-->
                        			<!--			cancel-->
                        			<!--		</div>-->
                        			<!--	</div>-->
                        				
                        			<!--</div>-->
                        			<!--</div>-->
                           <!--         <h4 class="font-semibold">${did('your_companyname').value}</h4>-->
                           <!--         <p class="text-xs">${did('your_companyaddress').value}</p>-->
                           <!--     </div>-->
                           <!--     <div class="flex flex-col gap-3 border-b py-6 text-xs">-->
                           <!--       <p class="flex justify-between">-->
                           <!--         <span class="text-gray-400 capitalize text-right">reference:</span>-->
                           <!--         <span>${datasource.reference}</span>-->
                           <!--       </p>-->
                           <!--       <p class="flex justify-between">-->
                           <!--         <span class="text-gray-400 capitalize text-right">arrival date:</span>-->
                           <!--         <span>${specialformatDateTime(datasource.arrivaldate)}</span>-->
                           <!--       </p>-->
                           <!--       <p class="flex justify-between">-->
                           <!--         <span class="text-gray-400 capitalize text-right">departure date:</span>-->
                           <!--         <span>${specialformatDateTime(datasource.departuredate)}</span>-->
                           <!--       </p>-->
                           <!--       <p class="flex justify-between">-->
                           <!--         <span class="text-gray-400 capitalize text-right">number of nights:</span>-->
                           <!--         <span>${specialformatDateTime(datasource.numberofnights)}</span>-->
                           <!--       </p>-->
                           <!--       <p class="flex justify-between">-->
                           <!--         <span class="text-gray-400 capitalize text-right">typeofguest:</span>-->
                           <!--         <span>${datasource.typeofguest}</span>-->
                           <!--       </p>-->
                           <!--     </div>-->
                           <!--     <div class="flex flex-col gap-3 pb-6 pt-2 text-xs">-->
                           <!--       <div class=" border-b border border-dashed">-->
                           <!--        <table class="w-full text-left">-->
                           <!--             <thead>-->
                           <!--               <tr class="flex">-->
                           <!--                 <th class="w-full py-2">Item</th>-->
                           <!--                 <th class="min-w-[44px] py-2">Amount Paid</th>-->
                           <!--               </tr>-->
                           <!--             </thead>-->
                           <!--             <tbody>-->
                           <!--               <tr class="flex">-->
                           <!--                 <td class="flex-1 py-1">Reservation</td>-->
                           <!--                 <td class="min-w-[64px] text-semibold">${formatNumber(Number(did('amountpaid').value))}</td>-->
                           <!--               </tr>-->
                           <!--             </tbody>-->
                           <!--           </table>-->
                           <!--       </div>-->
                           <!--       <div class="py-4 justify-center items-center flex flex-col gap-2">-->
                           <!--         <p class="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21.3 12.23h-3.48c-.98 0-1.85.54-2.29 1.42l-.84 1.66c-.2.4-.6.65-1.04.65h-3.28c-.31 0-.75-.07-1.04-.65l-.84-1.65a2.567 2.567 0 0 0-2.29-1.42H2.7c-.39 0-.7.31-.7.7v3.26C2 19.83 4.18 22 7.82 22h8.38c3.43 0 5.54-1.88 5.8-5.22v-3.85c0-.38-.31-.7-.7-.7ZM12.75 2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2h1.5V2Z" fill="#000"></path><path d="M22 9.81v1.04a2.06 2.06 0 0 0-.7-.12h-3.48c-1.55 0-2.94.86-3.63 2.24l-.75 1.48h-2.86l-.75-1.47a4.026 4.026 0 0 0-3.63-2.25H2.7c-.24 0-.48.04-.7.12V9.81C2 6.17 4.17 4 7.81 4h3.44v3.19l-.72-.72a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l2 2c.01.01.02.01.02.02a.753.753 0 0 0 .51.2c.1 0 .19-.02.28-.06.09-.03.18-.09.25-.16l2-2c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0l-.72.72V4h3.44C19.83 4 22 6.17 22 9.81Z" fill="#000"></path></svg>${did('your_companyemail').value}</p>-->
                           <!--         <p class="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path fill="#000" d="M11.05 14.95L9.2 16.8c-.39.39-1.01.39-1.41.01-.11-.11-.22-.21-.33-.32a28.414 28.414 0 01-2.79-3.27c-.82-1.14-1.48-2.28-1.96-3.41C2.24 8.67 2 7.58 2 6.54c0-.68.12-1.33.36-1.93.24-.61.62-1.17 1.15-1.67C4.15 2.31 4.85 2 5.59 2c.28 0 .56.06.81.18.26.12.49.3.67.56l2.32 3.27c.18.25.31.48.4.7.09.21.14.42.14.61 0 .24-.07.48-.21.71-.13.23-.32.47-.56.71l-.76.79c-.11.11-.16.24-.16.4 0 .08.01.15.03.23.03.08.06.14.08.2.18.33.49.76.93 1.28.45.52.93 1.05 1.45 1.58.1.1.21.2.31.3.4.39.41 1.03.01 1.43zM21.97 18.33a2.54 2.54 0 01-.25 1.09c-.17.36-.39.7-.68 1.02-.49.54-1.03.93-1.64 1.18-.01 0-.02.01-.03.01-.59.24-1.23.37-1.92.37-1.02 0-2.11-.24-3.26-.73s-2.3-1.15-3.44-1.98c-.39-.29-.78-.58-1.15-.89l3.27-3.27c.28.21.53.37.74.48.05.02.11.05.18.08.08.03.16.04.25.04.17 0 .3-.06.41-.17l.76-.75c.25-.25.49-.44.72-.56.23-.14.46-.21.71-.21.19 0 .39.04.61.13.22.09.45.22.7.39l3.31 2.35c.26.18.44.39.55.64.1.25.16.5.16.78z"></path></svg>${did('your_companyphone').value}</p>-->
                           <!--       </div>-->
                           <!--     </div>-->
                           <!--     <div class="w-full flex justify-center p-2">-->
                           <!--    <p>We appreciate your stay with us</p>-->
                           <!--   </div>-->
                           <!--   <div class="w-full flex justify-center p-2">-->
                           <!--    <p>We appreciate your stay with us</p>-->
                           <!--   </div>-->
                               
                        </div>
                        
                        </div>