$(document).ready(() => {
    $("form[action='/employees']").on("submit", (e) => {
        e.preventDefault();
        $.ajax({
            type : "POST",
            url : "/employees",
            data : {
                "firstname" : $("input[name='firstname']").val()
            },
            success : (result) => {
                if (result["errors"] !== undefined) {
                    $("#result").html(`<p class="text-center">No results.</p>`);
                    return;
                }
                let table = ``;
                table += `<p class="text-center">${result.length} employees has been fetched</p>`;
                table += `<div class="table-responsive">`;
                table += `<table class="table table-striped">`;
                table += `<thead class="thead-light">`;
                table += `<tr>`;
                table += `<th>Employee ID</th>`;
                table += `<th>Employee Name</th>`;
                table += `<th>Employee Birthdate</th>`;
                table += `</tr>`;
                table += `</thead>`;

                table += `<tbody>`;
                for (let i = 0; i < result.length; i++) {
                    table += `<tr>`;
                    table += `<td>${result[i].emp_no}</td>`;
                    table += `<td>${result[i].first_name + " " + result[i].last_name}</td>`;
                    table += `<td>${result[i].birth_date}</td>`;
                    table += `</tr>`;
                }
                table += `</tbody>`;
                table += `</table>`;
                table += `</div>`;
                $("#result").html(table);
            }
        })
    });
});