local alreadyOpen =  false
local p = promise.new()

local function Progress(title, ResultMsg, DurationPerOne, func)
    if alreadyOpen then return end

    p = promise.new()

    alreadyOpen = true

    SendNUIMessage({
        action = "start",
        title = title,
        ResultMsg = ResultMsg,
        DurationPerOne = DurationPerOne
    })

    Citizen.Await(p)

    alreadyOpen = false

    func()
end

RegisterCommand('testcard', function()
    Progress("Test Connection", "Completed", 250, function()
        print('succesfully ended')
    end)
end)


RegisterNUICallback("CardingComplete", function(data, cb)
    if data.carding then
        p:resolve(data.carding)
    end
end)


exports("Progress", Progress)
