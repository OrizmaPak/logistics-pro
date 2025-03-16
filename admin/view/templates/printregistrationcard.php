<section class="animate__animated animate__fadeIn">
    <p class="page-title">
        <span>PRINT REGISTRATION CARD</span>
    </p>
    
    <form id="filterprintregistrationcardform">
        <div class="bg-white/90 p-5 xl:p-10 rounded-sm">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="form-group">
                    <label for="startdate" class="control-label">Reservation Ref</label>
                    <input type="text" class="form-control" name="registrationnumber" id="registrationnumber">
                </div>
                <div class="form-group">
                    <label for="startdate" class="control-label">Arrival Date From</label>
                    <input type="date" class="form-control" name="startdate" id="enddate">
                </div>
                
                <div class="form-group">
                    <label for="enddate" class="control-label">To:</label>
                    <input type="date" class="form-control" name="enddate" id="enddate">
                </div>
            </div>
        </div>
        <div class="flex justify-end mt-5">
            <button id="submit" type="button" class="btn">
                <div class="btnloader" style="display: none;"></div>
                <span>Submit</span>
            </button>
        </div>
    </form>
    <hr class="my-10">
    
    <div>
        <div class="table-content">
            <table>
                <thead>
                    <tr>
                        <th style="width: 20px">s/n</th>
                        <th>Guest&nbsp;full name</th>
                        <th>room&nbsp;number</th>
                        <th>nationality</th>
                        <th>no.&nbsp;of&nbsp;nights</th>
                        <th>no.&nbsp;of&nbsp;persons</th>
                        <th>room&nbsp;category</th>
                        <!--<th>room&nbsp;rate</th>-->
                        <!--<th>reservation&nbsp;type</th>-->
                        <th>arrival&nbsp;date</th>
                        <th>departure&nbsp;date</th>
                        <!--<th>payment&nbsp;method</th>-->
                        <th>reservation&nbsp;date</th>
                        <!--<th>status</th>-->
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
</section>
