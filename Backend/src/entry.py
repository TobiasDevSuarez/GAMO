from workers import Response, WorkerEntrypoint

from submodule import get_socios


class Default(WorkerEntrypoint):
    async def fetch(self, request):
        socios = await get_socios(self.env)

        return Response.json(socios)