import server from "./server";
import swaggerDocs from "./doc/swagger";

const port = process.env.PORT || 4000;
server.listen(port, () => {
	console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\nApi Levantada");
	swaggerDocs(server, port);
});
